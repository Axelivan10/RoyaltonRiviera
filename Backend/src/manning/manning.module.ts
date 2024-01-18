import { Module } from '@nestjs/common';
import { ManningService } from './manning.service';
import { ManningController } from './manning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manning } from './entities/manning.entity';
import { dimShift } from './entities/dim_shift.entity';
import { dimServiceType } from './entities/dim_service_type.entity';
import { dimSalary } from './entities/dim_salary.entity';
import { dimPosition } from './entities/dim_position.entity';
import { dimPlant } from './entities/dim_plant.entity';
import { dimParameter } from './entities/dim_parameter.entity';
import { dimOcc } from './entities/dim_occ.entity';
import { dimDepartment } from './entities/dim_department.entity';
import { dimLocation } from './entities/dim_location.entity';
import { dimDivision } from './entities/dim_division.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manning, dimShift, dimServiceType, dimSalary, dimPosition, dimPlant, dimParameter, 
    dimOcc, dimDepartment, dimLocation, dimDivision])],
  providers: [ManningService],
  controllers: [ManningController]
})
export class ManningModule {}
