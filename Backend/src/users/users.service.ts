import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {Repository} from 'typeorm'
import { CreateUserDto } from './dto/create_user.dto'
import {UpdateUserDto} from './dto/update_user.dto'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    
    // checkLogin(email:string) {
    //     return this.userRepository.findOne({
    //         where:{
    //             email
    //         }
    //     })
    //   }

    async createUser(user: CreateUserDto){

        const emailFound = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        }) 

        if(emailFound){
            return new HttpException("User already exist", HttpStatus.CONFLICT);
        }

        const newUser = this.userRepository.create({
            name: user.name,
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
            code: user.code,
            role: user.role
        })
        
        return this.userRepository.save(newUser)
    }


    getUser(id:number){
        const userFound = this.userRepository.findOne({
            where:{
                id
            }
        })
        if(!userFound){
            return new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        return userFound;
    }


    getUsers(){
        return this.userRepository.find()
    }
    

    async updateUser(id: number, user: UpdateUserDto){
        const result = await this.userRepository.update({id}, user)

        if(result.affected == 0){
            return new HttpException("User not found",HttpStatus.NOT_FOUND)
        }

        return result;
    }

    
    async deleteUser(id:number){
        const result = await this.userRepository.delete({id})

        if(result.affected == 0){
            return new HttpException("User not found",HttpStatus.NOT_FOUND)
        }

        return result;

    }

}