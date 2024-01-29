import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Manning } from './entities/manning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManningDto } from './dto/manning.dto';
import { error } from 'console';
import { dimPosition } from './entities/dim/dim_position.entity';
import { dimDivision } from './entities/dim/dim_division.entity';
import { dimDepartment } from './entities/dim/dim_department.entity';
import { dimPlant } from './entities/dim/dim_plant.entity';
import { dimLocation } from './entities/dim/dim_location.entity';
import { locationConfig } from './entities/configuration/location_config.entity';
import { plantConfig } from './entities/configuration/plant_config.entity';

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
    @InjectRepository(locationConfig)
    private locationConfigRepository: Repository<locationConfig>,
    @InjectRepository(plantConfig)
    private plantConfigRepository: Repository<plantConfig>,
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
    return this.divisionRepository.find({ relations: ['positionsDivision'] });
  }

  async testDepartment(): Promise<dimDepartment[]> {
    return this.departmentRepository.find({
      relations: ['positionDepartment'],
    });
  }

 async testLocationConfigDepartment(): Promise<dimDepartment[]> {
    return this.departmentRepository.find({
      relations: ['locationConfigDepartment'],
    });
  }

  async testLocationConfigLocation(): Promise<dimLocation[]> {
    return this.locationRepository.find({
      relations: ['locationConfigLocation'],
    });
  }

  async relationsLocationConfig(): Promise<locationConfig[]> {
    return this.locationConfigRepository.find({ relations: ['location', 'deparment'] });
  }

  async relationsPlantConfig(): Promise<plantConfig[]> {
    return this.plantConfigRepository.find({ relations: ['location', 'deparment', 'plant'] });
  }
  
  async getHotels() {
    return this.plantRepository.find();
  }
  
  async updateHotels(editValues) {
      const updatedRecords = [];

      for (const record of editValues) {
        const { id, ...restOfValues } = record;
        try {
          const numericId = Number(id);

          // Suponiendo que PlantService.update es asíncrono
          const updatedRecord = await this.plantRepository.update(
            numericId,
            restOfValues,
          );

          updatedRecords.push(updatedRecord);

        } catch (error) {
          console.error(`Error updating record with id ${id}: ${error.message}`);
        }
      }

      return updatedRecords;
  }

  async getDivision() {
    return this.divisionRepository.find();
  }

  getDepartment() {
    return this.departmentRepository.find();
  }

  getLocation() {
    return this.locationRepository.find();
  }

  locationConfig() {
    return this.locationConfigRepository.find();
  }

  plantConfig() {
    return this.plantConfigRepository.find();
  }

  async updateLocationsConfig(editInputs) {
      const updatedRecords = [];
      // console.log(editInputs)
      for (const record of editInputs) {
        const { position, xSymbol } = record;
        try {

          const updatedRecord = await this.locationConfigRepository.update(
            { position },
            { xSymbol },
          );

          updatedRecords.push(updatedRecord);

        } catch (error) {
          Error(`Error updating record with ${position}: ${error.message}`);
        }
      }

      return editInputs;
  }

  async updatePlantConfig(editInputs) {
    const updatedRecords = [];
    // console.log(editInputs)
    for (const record of editInputs) {
      const { position, xSymbol } = record;
      try {

        // Suponiendo que PlantService.update es asíncrono
        const updatedRecord = await this.plantConfigRepository.update(
          { position },
          { xSymbol },
        );

        updatedRecords.push(updatedRecord);

      } catch (error) {
        Error(`Error updating record with ${position}: ${error.message}`);
      }
    }

    return editInputs;
}

  async createLocation(areaCode){
          const location = await this.locationRepository.findOne({ where:{
            areaCode: areaCode.areaCode,
          }})
          
          console.log(location)
          if (location) {
              throw new HttpException('Location already Exist', HttpStatus.BAD_REQUEST);
          }
        
          const newLocation = this.locationRepository.create({
            areaCode: areaCode.areaCode,
        })
        
        return this.locationRepository.save(newLocation)
  }

  async createPlant(dataPlant){
          const plant = await this.plantRepository.findOne({ where:{
            plantCode: dataPlant.plantCode,
            plantId: dataPlant.plantId
          }})
          console.log(plant)
          if (plant) {
              throw new HttpException('Location already Exist', HttpStatus.BAD_REQUEST);
          }
        
          const newLocation = this.plantRepository.create({
            country: dataPlant.country,
            plantId: dataPlant.plantId,
            plantCode: dataPlant.plantCode,
            plantDescription: dataPlant.plantDescription,
            rooms: dataPlant.rooms,
            
        })
        
        return this.plantRepository.save(newLocation)
  }

  
}


