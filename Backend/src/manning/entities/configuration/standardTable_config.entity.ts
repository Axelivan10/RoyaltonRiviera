import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimDivision } from '../dim/dim_division.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimParameter } from '../dim/dim_parameter.entity';
import { masterRatiosConfig } from './masterRatios_config.entity';


@Entity()
export class standardTableConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    positionId: string;

    @ManyToOne(() => dimPosition, position => position.standardTableConfigPosition)
    dimPosition: dimPosition;

    @ManyToOne(() => dimDivision, division => division.standardTableConfigDivision)
    division: dimDivision;

    @ManyToOne(() => dimDepartment, department => department.standardTableConfigDepartment)
    deparment: dimDepartment;

    @Column({nullable: true})
    level: string;

    @ManyToOne(() => dimShift, shift => shift.standardTableConfigShift)
    shift: dimShift;

    @Column({nullable: true})
    criteria: string;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.standardTableConfigServiceType)
    serviceType: dimServiceType;

    @ManyToOne(() => dimParameter, parameter => parameter.standardTableConfigParameter)
    parameter: dimParameter;

    @OneToMany(() => masterRatiosConfig, masterRatiosConfig => masterRatiosConfig.standardTableConfig)
    masterRatiosConfig: masterRatiosConfig;

    @Column({nullable: true})
    ratio: number;

    @Column({nullable: true})
    xs: number;

    @Column({nullable: true})
    x: number;

    @Column({nullable: true})
    m: number;

    @Column({nullable: true})
    l: number;

    @Column({nullable: true})
    xl: number;

    @Column({nullable: true})
    std: string;

    @Column({nullable: true})
    rt: string;
    
    @Column({nullable: true})
    other: string;

    @Column({nullable: true})
    kit: string;

    @Column({nullable: true})
    cubre: string;

    @Column({nullable: true})
    rev: string;
}