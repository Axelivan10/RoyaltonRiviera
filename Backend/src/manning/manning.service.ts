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
import { shiftConfig } from './entities/configuration/shift_config.entity';
import { dimShift } from './entities/dim/dim_shift.entity';
import { serviceTypeConfig } from './entities/configuration/serviceType_config.entity';
import { dimServiceType } from './entities/dim/dim_service_type.entity';
import { positionConfig } from './entities/configuration/position_config.entity';
import { position_locationConfig } from './entities/configuration/positionxLocation_config.entity';
import { standardTableConfig } from './entities/configuration/standardTable_config.entity';
import { sizeCriteriaConfig } from './entities/configuration/sizeCriteria_config.entity';

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
    @InjectRepository(dimShift)
    private ShiftRepository: Repository<dimShift>,
    @InjectRepository(dimPlant)
    private plantRepository: Repository<dimPlant>,
    @InjectRepository(dimLocation)
    private locationRepository: Repository<dimLocation>,
    @InjectRepository(locationConfig)
    private locationConfigRepository: Repository<locationConfig>,
    @InjectRepository(plantConfig)
    private plantConfigRepository: Repository<plantConfig>,
    @InjectRepository(shiftConfig)
    private shiftConfigRepository: Repository<shiftConfig>,
    @InjectRepository(dimServiceType)
    private dimServiceTypeRepository: Repository<dimServiceType>,
    @InjectRepository(serviceTypeConfig)
    private serviceTypeConfigRepository: Repository<serviceTypeConfig>,
    @InjectRepository(positionConfig)
    private positionConfigRepository: Repository<positionConfig>,
    @InjectRepository(position_locationConfig)
    private posLocConfigRepository: Repository<position_locationConfig>,
    @InjectRepository(standardTableConfig)
    private standardTableConfigRepository: Repository<standardTableConfig>,
    @InjectRepository(sizeCriteriaConfig)
    private sizeCriteriaConfigRepository: Repository<sizeCriteriaConfig>,
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
    return this.locationConfigRepository.find({
      relations: ['location', 'deparment'],
    });
  }

  async relationsPlantConfig(): Promise<plantConfig[]> {
    return this.plantConfigRepository.find({
      relations: ['location', 'deparment', 'plant'],
    });
  }

  async relationsShiftConfig(): Promise<shiftConfig[]> {
    return this.shiftConfigRepository.find({
      relations: ['location', 'deparment', 'plant', 'shift'],
    });
  }

  async relationsServiceTypeConfig(): Promise<serviceTypeConfig[]> {
    return this.serviceTypeConfigRepository.find({
      relations: ['location', 'deparment', 'plant', 'shift', 'serviceType'],
    });
  }

  async relationsPositionConfig(): Promise<positionConfig[]> {
    return this.positionConfigRepository.find({
      relations: ['positiondim', 'location', 'deparment', 'plant'],
    });
  }

  async relationsPosLocConfig(): Promise<position_locationConfig[]> {
    return this.posLocConfigRepository.find({
      relations: ['dimPosition', 'location', 'deparment', 'plant', 'shift'],
    });
  }

  async relationsStandardTableConfig(): Promise<standardTableConfig[]> {
    return this.standardTableConfigRepository.find({
      relations: ['dimPosition', 'division', 'deparment', 'shift', 'serviceType', 'parameter'],
    });
  }

  async relationsSizeCriteriaConfig(): Promise<sizeCriteriaConfig[]> {
    return this.sizeCriteriaConfigRepository.find({
      relations: ['parameter'],
    });
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

  async getShift() {
    return this.ShiftRepository.find();
  }

  async getServiceType() {
    return this.dimServiceTypeRepository.find();
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

  shiftConfig() {
    return this.shiftConfigRepository.find();
  }

  serviceTypeConfig() {
    return this.serviceTypeConfigRepository.find();
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

  async updateShiftConfig(editInputs) {
    const updatedRecords = [];
    for (const record of editInputs) {
      const { position, xSymbol } = record;
      try {
        // Suponiendo que PlantService.update es asíncrono
        const updatedRecord = await this.shiftConfigRepository.update(
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

  async updateServiceTypeConfig(editInputs) {
    const updatedRecords = [];

    for (const record of editInputs) {
      const { locationId, selectId } = record;

      try {
        const existingRecord = await this.serviceTypeConfigRepository.findOne({
          where: {
            id: locationId,
          },
        });

        if (existingRecord) {
          existingRecord.serviceType = selectId;

          const updatedRecord =
            await this.serviceTypeConfigRepository.save(existingRecord);
          updatedRecords.push(updatedRecord);
        } else {
          console.error(`Record with locationId ${locationId} not found.`);
        }
      } catch (error) {
        console.error(
          `Error updating record with ${locationId}: ${error.message}`,
        );
      }
    }

    return updatedRecords;
  }

  async updatePositionConfig(editInputs) {
    const updatedRecords = [];
    for (const record of editInputs) {
      const { position, xSymbol } = record;
      try {
        // Suponiendo que PlantService.update es asíncrono
        const updatedRecord = await this.positionConfigRepository.update(
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

  async updatePosLocConfig(editInputs) {
    const updatedRecords = [];
    for (const record of editInputs) {
      const { position, xSymbol } = record;
      try {
        // Suponiendo que PlantService.update es asíncrono
        const updatedRecord = await this.posLocConfigRepository.update(
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

  async createLocation(dataLocation) {
    const location = await this.locationRepository.findOne({
      where: {
        areaCode: dataLocation.dataLocation.location,
      },
    });

    if (location) {
      throw new HttpException('Location already Exist', HttpStatus.BAD_REQUEST);
    }

    const newLocation = this.locationRepository.create({
      areaCode: dataLocation.dataLocation.location,
    });

    const { id } = await this.locationRepository.save(newLocation);
    const stringPosition =
      String(id) + '-' + String(dataLocation.dataLocation.departmentId);

    const saveDepartment = this.locationConfigRepository.create({
      position: stringPosition,
      xSymbol: 'x',
      location: newLocation,
      deparment: dataLocation.dataLocation.departmentId,
    });

    return this.locationConfigRepository.save(saveDepartment);
  }

  async createPlant(dataPlant) {
    const plant = await this.plantRepository.findOne({
      where: [
        { plantCode: dataPlant.plantCode },
        { plantId: dataPlant.plantId },
      ],
    });

    console.log(plant);
    if (plant) {
      throw new HttpException('Location already Exist', HttpStatus.BAD_REQUEST);
    }

    const newLocation = this.plantRepository.create({
      country: dataPlant.country,
      plantId: dataPlant.plantId,
      plantCode: dataPlant.plantCode,
      plantDescription: dataPlant.plantDescription,
      rooms: dataPlant.rooms,
    });

    return this.plantRepository.save(newLocation);
  }


  async createServiceTypeConfig(dataValues) {
    try {

      // const serviceType = await this.serviceTypeConfigRepository.findOne({
      //   where: {
      //     location: dataValues.dataValues.location.id,
      //     deparment: dataValues.dataValues.deparment.id,
      //     plant: dataValues.dataValues.plant.id,
      //     shift: dataValues.dataValues.shift.shiftId,
      //     serviceType: dataValues.dataValues.serviceType.serviceTypeId,
      //   },
      // });

      // if (serviceType) { 
      //   throw new HttpException('Service already Exist', HttpStatus.BAD_REQUEST);
      // }

      const newServiceType = this.serviceTypeConfigRepository.create({
        location: dataValues.dataValues.location.id,
        deparment: dataValues.dataValues.deparment.id,
        plant: dataValues.dataValues.plant.id,
        shift: dataValues.dataValues.shift.shiftId,
        serviceType: { serviceTypeId: 9999 },  
        //ESTO ES LO QUE IBA ANTES ES UN PARCHE PARA QUE FUNCIONE  
        //dataValues.dataValues.serviceType.serviceTypeId
      });

      return await this.serviceTypeConfigRepository.save(newServiceType);

    } catch (error) {
      console.error('Error al crear el ServiceTypeConfig:', error);
      throw new HttpException('Error al crear el ServiceTypeConfig:', HttpStatus.BAD_REQUEST,
      );
    }

  }

}
