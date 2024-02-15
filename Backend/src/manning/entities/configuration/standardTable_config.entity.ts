import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimDivision } from '../dim/dim_division.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimParameter } from '../dim/dim_parameter.entity';


@Entity()
export class standardTableConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    positionId: string;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    xSymbol: string;

    @Column({nullable: true})
    numberValue: number;

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

    @Column({nullable: true})
    ratio: number;
    
}