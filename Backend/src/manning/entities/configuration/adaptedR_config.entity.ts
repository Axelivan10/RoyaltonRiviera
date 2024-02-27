import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { dimDivision } from '../dim/dim_division.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimParameter } from '../dim/dim_parameter.entity';


@Entity()
export class adaptedRConfig {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => dimDivision, division => division.adaptedRConfigDivision)
    division: dimDivision;

    @ManyToOne(() => dimDepartment, department => department.adaptedRConfigDepartment)
    department: dimDepartment;

    @ManyToOne(() => dimPosition, position => position.adaptedRConfigPosition)
    positiondim: dimPosition;

    @ManyToOne(() => dimShift, shift => shift.adaptedRConfigShift)
    shift: dimShift;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.adaptedRConfigServiceType)
    serviceType: dimServiceType;

    @ManyToOne(() => dimParameter, parameter => parameter.adaptedRConfigParameter)
    parameter: dimParameter;

    @Column({nullable: true})
    criteria: string;
    
    @Column({nullable: true})
    xs: number;

    @Column({nullable: true})
    s: number;

    @Column({nullable: true})
    m: number;

    @Column({nullable: true})
    l: number;

    @Column({nullable: true})
    xl: number;

}