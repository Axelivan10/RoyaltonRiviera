import{Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import { dimPosition } from './dim_position.entity';
import { locationConfig } from '../configuration/location_config.entity';
import { plantConfig } from '../configuration/plant_config.entity';
import { shiftConfig } from '../configuration/shift_config.entity';
import { serviceTypeConfig } from '../configuration/serviceType_config.entity';
import { positionConfig } from '../configuration/position_config.entity';
import { position_locationConfig } from '../configuration/positionxLocation_config.entity';
import { standardTableConfig } from '../configuration/standardTable_config.entity';
import { flowsRestConfig } from '../configuration/flowsRest_config.entity';
import { flowsGrlConfig } from '../configuration/flowsGrl_config.entity';
import { adaptedRConfig } from '../configuration/adaptedR_config.entity';
import { masterRatiosConfig } from '../configuration/masterRatios_config.entity';

@Entity()
export class dimDepartment{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    divBis: string;

    @Column({nullable: true})
    divBisCode: string;

    @Column({nullable: true})
    deptmBis: string;

    @Column({nullable: true})
    deptmBisCode: string;

    @OneToMany(() => dimPosition, (position) => position.deptmBis)
    positionDepartment: dimPosition[];

    @OneToMany(() => locationConfig, (location) => location.deparment)
    locationConfigDepartment: locationConfig[];

    @OneToMany(() => plantConfig, (plant) => plant.deparment)
    plantConfigDepartment: plantConfig[];

    @OneToMany(() => shiftConfig, (shift) => shift.deparment)
    shiftConfigDepartment: shiftConfig[];

    @OneToMany(() => serviceTypeConfig, (serviceType) => serviceType.deparment)
    serviceTypeConfigDepartment: serviceTypeConfig[];

    @OneToMany(() => positionConfig, (position) => position.deparment)
    positionConfigDepartment: positionConfig[];

    @OneToMany(() => position_locationConfig, (posloc) => posloc.deparment)
    posLocConfigDepartment: position_locationConfig[];

    @OneToMany(() => standardTableConfig, (standardTable) => standardTable.deparment)
    standardTableConfigDepartment: standardTableConfig[];

    @OneToMany(() => flowsRestConfig, (flowsRest) => flowsRest.department)
    flowsRestConfigDepartment: flowsRestConfig[];

    @OneToMany(() => flowsGrlConfig, (flowsGrl) => flowsGrl.department)
    flowsGrlConfigDepartment: flowsGrlConfig[];

    @OneToMany(() => adaptedRConfig, (adaptedR) => adaptedR.department)
    adaptedRConfigDepartment: adaptedRConfig[];

    @OneToMany(() => masterRatiosConfig, (masterRatios) => masterRatios.department)
    masterRatiosConfigDepartment: masterRatiosConfig[];
    
}