import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Manning } from './entities/manning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManningDto } from './dto/manning.dto';
import { error } from 'console';
import { dimPosition } from './entities/dim_position.entity';
import { dimDivision } from './entities/dim_division.entity';
import { dimDepartment } from './entities/dim_department.entity';
import { dimPlant } from './entities/dim_plant.entity';
import { dimLocation } from './entities/dim_location.entity';

@Injectable()
export class ManningService {
  constructor(
    @InjectRepository(Manning) private ManningRepository: Repository<Manning>,
    @InjectRepository(dimPosition)
    private positionRepository: Repository<dimPosition>,
    @InjectRepository(dimDivision)
    private divisionRepository: Repository<dimDivision>,
    @InjectRepository(dimDepartment)
    private departmentRepository: Repository<dimDepartment>,
    @InjectRepository(dimPlant)
    private plantRepository: Repository<dimPlant>,
    @InjectRepository(dimLocation)
    private locationRepository: Repository<dimLocation>,
    
  ) {}

  async createInfoManning(manning: ManningDto) {
    const dataFound = await this.ManningRepository.findOne({
      where: {
        position: manning.position,
      },
    });
    console.log(dataFound);
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
      parameterValue: manning.parameterValue,
    });

    return this.ManningRepository.save(newInfo);
  }

  getInfoParameter(manning: ManningDto) {
    if (manning.hotel) {
      const result = this.ManningRepository.findBy({
        hotel: manning.hotel,
      });
      if (!result) {
        throw error('Information not found');
      }
      return result;
    } else {
      return this.ManningRepository.find();
    }
  }

  getAllInfoManning(manning: ManningDto) {
    
    if (manning.hotel && manning.region && manning.country) {
      const result = this.ManningRepository.findBy({
        hotel: manning.hotel,
        region: manning.region,
        country: manning.country,
      });
      if (!result) {
        throw error('Information not found');
      }
      return result;
    }

    if (manning.hotel && manning.region) {
      const result = this.ManningRepository.findBy({
        hotel: manning.hotel,
        region: manning.region,
      });
      if (!result) {
        throw error('Information not found');
      }
      return result;
    }

    if (manning.hotel && manning.country) {
      const result = this.ManningRepository.findBy({
        hotel: manning.hotel,
        country: manning.country,
      });
      if (!result) {
        throw error('Information not found');
      }
      return result;
    }

    if (manning.region && manning.country) {
      const result = this.ManningRepository.findBy({
        region: manning.region,
        country: manning.country,
      });
      if (!result) {
        throw error('Information not found');
      }
      return result;
    } else if (manning.region) {
      const result = this.ManningRepository.findBy({
        region: manning.region,
      });
      if (!result) throw error('Information not found');
      return result;
    } else if (manning.country) {
      //ESTA ES LA NUEVA MANERA PARA MEJORAR CODIGO VER SI SIRVE PARA QUE FUNCIONE, LO PUSE EN UNDEFINED
      const result = this.ManningRepository.findBy({
        country: manning.country,
      });
      if (!result) throw error('Information not found');
      return result;
    } else if (manning.hotel) {
      const result = this.ManningRepository.findBy({
        hotel: manning.hotel,
      });
      if (!result) throw error('Information not found');
      return result;
    } else {
      return this.ManningRepository.find();
    }
  }

  async updateInfoManning(id: number, user: ManningDto) {}

  deleteInfoManning(id: number) {}

  async testDivision(): Promise<dimDivision[]> {
    return this.divisionRepository.find(
      { relations: ['positionsDivision'] }
    );
  }

  async testDepartment(): Promise<dimDepartment[]> {
    return this.departmentRepository.find(
      { relations: ['positionDepartment'] }
    );
  }

  async getHotels() {
    return this.plantRepository.find()
  }

  async getDivision(){
    return this.divisionRepository.find();
   }

  getDepartment(){
    const dataDepartment = this.departmentRepository.find();
    return dataDepartment;
  }

  getLocation(){
    const dataLocation = this.locationRepository.find();
    return dataLocation;
  }

  

}
