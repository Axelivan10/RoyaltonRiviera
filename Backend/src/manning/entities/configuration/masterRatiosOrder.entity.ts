import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne} from 'typeorm'
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimDivision } from '../dim/dim_division.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimParameter } from '../dim/dim_parameter.entity';
import { standardTableConfig } from './standardTable_config.entity';


@Entity()
export class masterRatiosOrderConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    positionId: string;

    @Column({nullable: true})
    positionDescription: string;

    @Column({nullable: true})
    division: string;

    @Column({nullable: true})
    divisionCode: string;

    @Column({nullable: true})
    department: string;

    @Column({nullable: true})
    departmentCode: string;

    @Column({nullable: true})
    serviceType: string;

    @Column({nullable: true})
    parameter: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    value: number;
}