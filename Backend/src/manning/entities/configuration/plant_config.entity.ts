import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';



@Entity()
export class plantConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    xSymbol: string;

    @ManyToOne(() => dimLocation, location => location.plantConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.plantConfigDepartment)
    deparment: dimDepartment;

    @ManyToOne(() => dimPlant, plant => plant.plantConfigPlant)
    plant: dimPlant;

}