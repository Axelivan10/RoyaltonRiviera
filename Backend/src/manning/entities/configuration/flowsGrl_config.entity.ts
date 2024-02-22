import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimDivision } from '../dim/dim_division.entity';
import { dimParameter } from '../dim/dim_parameter.entity';


@Entity()
export class flowsGrlConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    positionID: string;

    @ManyToOne(() => dimPosition, position => position.flowsGrlConfigPosition)
    positiondim: dimPosition;

    @ManyToOne(() => dimDivision, position => position.flowsGrlConfigDivision)
    division: dimDivision;

    @ManyToOne(() => dimDepartment, department => department.flowsGrlConfigDepartment)
    department: dimDepartment;

    @ManyToOne(() => dimParameter, parameter => parameter.flowsGrlConfigParameter)
    parameter: dimParameter;

    @Column({nullable: true})
    twenty: number;

    @Column({nullable: true})
    thirty: number;

    @Column({nullable: true})
    forty: number;

    @Column({nullable: true})
    fifty: number;

    @Column({nullable: true})
    sixty: number;

    @Column({nullable: true})
    seventy: number;

    @Column({nullable: true})
    eighty: number;

    @Column({nullable: true})
    ninety: number;

    @Column({nullable: true})
    rate: number;
}