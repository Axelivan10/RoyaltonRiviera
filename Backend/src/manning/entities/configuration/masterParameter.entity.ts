import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';


@Entity()
export class masterParameter{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    hotel: string;

    @Column({nullable: true})
    location: string;

    @Column({nullable: true})
    parameter: string;
    
    @Column({nullable: true})
    parameterValue: number;

}