import { Injectable,HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Post, Get, Body, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Code, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/users/dto/update_user.dto';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

@Injectable()
export class AuthService {
    constructor( @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}


    @Post()
    async loginAuth(@Body() newuser: CreateUserDto)/*: Promise<User>*/{
        
        const user = await this.userRepository.findOne({ where:{
            email: newuser.email,
        }})

        const isMatch = await bcrypt.compare(newuser.password, user.password);
        if (!isMatch) {
            throw new HttpException('User or Password incorrect', HttpStatus.BAD_REQUEST);
        }

        const payload = { sub: user.id, username: user.email };
        
        const token = await this.jwtService.signAsync(payload);
        return {
            id: user.id,
            email: newuser.email,
            token,
            role: user.role,
            auth: true
          };
    }


    async sendEmail(id: number, user: UpdateUserDto){
    
      try {
        const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);
        const tiempoLimite = Date.now() + 180000; // 3 minutos en milisegundos

        console.log(tiempoLimite)

        const userFind = await this.userRepository.findOne({
          where:{
              id
          }
        });
      
        if (!userFind) {
          return new HttpException("User not found",HttpStatus.NOT_FOUND)
        }
        userFind.code = codigoVerificacion;
        await this.userRepository.save(userFind);



        // Leer la plantilla HTML
        const htmlTemplate = fs.readFileSync('src/auth/template/template.email.html', 'utf8');
        // Reemplazar el marcador de posición en la plantilla con el código de verificación real
        const plantillaConCodigo = htmlTemplate.replace('{{codigoVerificacion}}', codigoVerificacion.toString());


        // Configurar el transporte de nodemailer para Outlook
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'axiv9554@gmail.com', // mi dirección de correo electrónico
            pass: 'tbdq mhyf pyxu yvga', // mi contraseña
          },
        });

        const mensajeCorreo = {
          from: 'axiv9554@gmail.com',
          to: user.email,
          subject: 'Blue Diamond Resorts',
          html: plantillaConCodigo,
        };
        await transporter.sendMail(mensajeCorreo);
        
        return {
          id,
          tiempoLimite,
          // codigoVerificacion
        }

      } catch (error) {
        return new HttpException("User not found",HttpStatus.NOT_FOUND)
      }

}


    async checkCode(id: number, user: UpdateUserDto){ //AQUI LE VAMOS A PONER UN IF SI LO EL CODIGO QUE SE GUARDO ES IGUAL AL QUE PUSO EN EL FRONT
        const expiration = parseInt(user.expiration);

      if (Date.now() > expiration) {
        throw new HttpException('Time over',HttpStatus.GATEWAY_TIMEOUT);
      }

      const userFind = await this.userRepository.findOne({
        where:{
            id
        }
      });
    
      if(!userFind){
        throw new HttpException("User not found",HttpStatus.NOT_FOUND)
      }

      if(user.code !== userFind.code){
        throw new HttpException("Diferent codes",HttpStatus.NOT_FOUND)
      }

        return {
          auth: true
        }
    }
  

}