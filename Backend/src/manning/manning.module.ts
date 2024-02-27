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
import { shiftConfig } from './entities/configuration/shift_config.entity';
import { serviceTypeConfig } from './entities/configuration/serviceType_config.entity';
import { positionConfig } from './entities/configuration/position_config.entity';
import { position_locationConfig } from './entities/configuration/positionxLocation_config.entity';
import { standardTableConfig } from './entities/configuration/standardTable_config.entity';
import { sizeCriteriaConfig } from './entities/configuration/sizeCriteria_config.entity';
import { flowsRestConfig } from './entities/configuration/flowsRest_config.entity';
import { flowsGrlConfig } from './entities/configuration/flowsGrl_config.entity';
import { kitchenGrlConfig } from './entities/configuration/kitchenGrl_config.entity';
import { kitchenBackConfig } from './entities/configuration/kitchenBack_config.entity';
import { adaptedHConfig } from './entities/configuration/adaptedH_config.entity';
import { adaptedRConfig } from './entities/configuration/adaptedR_config.entity';
import { absentessiemConfig } from './entities/configuration/Absentessiem_config.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manning, dimShift, dimServiceType, dimSalary, dimPosition, dimPlant, dimParameter, 
    dimOcc, dimDepartment, dimLocation, dimDivision, locationConfig, plantConfig, shiftConfig, serviceTypeConfig, positionConfig,
    position_locationConfig, standardTableConfig, sizeCriteriaConfig, flowsRestConfig, flowsGrlConfig, kitchenGrlConfig,
    kitchenBackConfig, adaptedHConfig, adaptedRConfig, absentessiemConfig])],
  providers: [ManningService],
  controllers: [ManningController]
})
export class ManningModule {}
