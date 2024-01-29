import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';


@Entity()
export class locationConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    xSymbol: string;

    @ManyToOne(() => dimLocation, location => location.locationConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.locationConfigDepartment)
    deparment: dimDepartment;
}