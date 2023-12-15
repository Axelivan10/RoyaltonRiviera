import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Manning } from './manning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManningDto } from './dto/manning.dto';
import { error } from 'console';

@Injectable()
export class ManningService {
  constructor(
    @InjectRepository(Manning) private ManningRepository: Repository<Manning>,
  ) {}


  async createInfoManning(manning: ManningDto) {
    const dataFound = await this.ManningRepository.findOne({
      where: {
        position: manning.position,
      },
    });
    console.log(dataFound)
    if (dataFound) {
      return new HttpException('Data already exist', HttpStatus.CONFLICT);
    }

    const newInfo = this.ManningRepository.create({
      id: manning.id,
      hotel: manning.hotel,
      region: manning.region,
      position: manning.position,
      cincuenta: manning.cincuenta,
      sesenta: manning.sesenta,
      setenta: manning.setenta,
      ochenta: manning.ochenta,
      noventa: manning.noventa,
      area: manning.area,
      parameter: manning.parameter,
      parameterValue: manning.parameterValue
    });

    return this.ManningRepository.save(newInfo);
  }


  getInfoParameter(manning:ManningDto) {
    if(manning.hotels.kind){
      const result = this.ManningRepository.findBy({
        hotel: manning.hotels.value,
      })
      if(!result){
        throw error(("Information not found"))
      }
      return result;
      }

      else{
        return this.ManningRepository.find();
      }
    } 


  getAllInfoManning(manning: ManningDto) {
    
    if(manning.hotels.kind && manning.regions.kind){
      const result = this.ManningRepository.findBy({
        hotel: manning.hotels.value,
        region: manning.regions.value,
      })
      if(!result){
        throw error(("Information not found"))
      }
      return result
    }

    else if(manning.hotels.kind){
      const result = this.ManningRepository.findBy({
        hotel: manning.hotels.value,
      })
      if(!result) throw error("Information not found")
      return result
    }

    else if(manning.regions.kind){
      const result = this.ManningRepository.findBy({
        region: manning.regions.value,
      })
      if(!result) throw error("Information not found")
      return result
    }
    
    else{
      return this.ManningRepository.find();
    }
  }

  async updateInfoManning(id: number, user: ManningDto) {}


  deleteInfoManning(id: number) {}
}
