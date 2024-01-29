import { Module } from '@nestjs/common';
import { ManningService } from './manning.service';
import { ManningController } from './manning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manning } from './entities/manning.entity';
import { dimShift } from './entities/dim/dim_shift.entity';
import { dimServiceType } from './entities/dim/dim_service_type.entity';
import { dimSalary } from './entities/dim/dim_salary.entity';
import { dimPosition } from './entities/dim/dim_position.entity';
import { dimPlant } from './entities/dim/dim_plant.entity';
import { dimParameter } from './entities/dim/dim_parameter.entity';
import { dimOcc } from './entities/dim/dim_occ.entity';
import { dimDepartment } from './entities/dim/dim_department.entity';
import { dimLocation } from './entities/dim/dim_location.entity';
import { dimDivision } from './entities/dim/dim_division.entity';
import { locationConfig } from './entities/configuration/location_config.entity';
import { plantConfig } from './entities/configuration/plant_config.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manning, dimShift, dimServiceType, dimSalary, dimPosition, dimPlant, dimParameter, 
    dimOcc, dimDepartment, dimLocation, dimDivision, locationConfig, plantConfig])],
  providers: [ManningService],
  controllers: [ManningController]
})
export class ManningModule {}
