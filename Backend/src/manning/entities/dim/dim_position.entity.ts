import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import {dimDivision} from './dim_division.entity'
import { dimDepartment } from './dim_department.entity';
import { positionConfig } from '../configuration/position_config.entity';
import { position_locationConfig } from '../configuration/positionxLocation_config.entity';
import { standardTableConfig } from '../configuration/standardTable_config.entity';
import { flowsGrlConfig } from '../configuration/flowsGrl_config.entity';
import { kitchenBackConfig } from '../configuration/kitchenBack_config.entity';
import { adaptedHConfig } from '../configuration/adaptedH_config.entity';
import { adaptedRConfig } from '../configuration/adaptedR_config.entity';
import { operations } from '../operations.entity';
import { masterRatiosConfig } from '../configuration/masterRatios_config.entity';

@Entity()
export class dimPosition{

    @PrimaryGeneratedColumn()
    positionId: number;                 //verificar si es necesario poner un number

    @Column({nullable: true})
    positionDescriptionES: string;

    @Column({nullable: true})
    positionDescriptionEN: string;

    @ManyToOne(() => dimDivision, division => division.positionsDivision)
    divBis: dimDivision;

    @ManyToOne(() => dimDepartment, department => department.positionDepartment) 
    deptmBis: dimDepartment;

    @ManyToOne(() => positionConfig, position => position.positiondim) 
    positionConfig: positionConfig[];

    @ManyToOne(() => position_locationConfig, posloc => posloc.dimPosition) 
    posLocConfigPosition: position_locationConfig[];

    @ManyToOne(() => standardTableConfig, standardTable => standardTable.dimPosition) 
    standardTableConfigPosition: standardTableConfig[];

    @ManyToOne(() => flowsGrlConfig, flowsGrl => flowsGrl.positiondim) 
    flowsGrlConfigPosition: flowsGrlConfig[];

    @ManyToOne(() => kitchenBackConfig, kitchenBack => kitchenBack.positiondim) 
    kitchenBackConfigPosition: kitchenBackConfig[];

    @ManyToOne(() => adaptedHConfig, adaptedH => adaptedH.positiondim) 
    adaptedHConfigPosition: adaptedHConfig[];

    @ManyToOne(() => adaptedRConfig, adaptedR => adaptedR.positiondim) 
    adaptedRConfigPosition: adaptedRConfig[];

    @ManyToOne(() => operations, operations => operations.positiondim) 
    operationsPosition: operations[];

    @ManyToOne(() => masterRatiosConfig, masterRatios => masterRatios.positiondim) 
    masterRatiosConfigPosition: masterRatiosConfig[];

    @Column({nullable: true})
    divisionId: string;

    @Column({nullable: true})
    divisionCode: string;

    @Column({nullable: true})
    departmentId: string;

    @Column({nullable: true})
    departmentCode: string;

    @Column({nullable: true})
    financeDivisionCode: string;

    @Column({nullable: true})
    areaNombre: string;

    @Column({nullable: true})
    deptoClave: string;

    @Column({nullable: true})
    deptoNombre: string;

    @Column({nullable: true})
    groupLevel: string;

    @Column({nullable: true})
    benefitLevel: string;

    @Column({nullable: true})
    benefit: string;

    @Column({nullable: true})
    regionalCorp: string;
}