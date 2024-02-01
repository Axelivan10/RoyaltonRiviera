import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimShift } from '../dim/dim_shift.entity';



@Entity()
export class shiftConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    xSymbol: string;

    @ManyToOne(() => dimLocation, location => location.shiftConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.shiftConfigDepartment)
    deparment: dimDepartment;

    @ManyToOne(() => dimPlant, plant => plant.shiftConfigPlant)
    plant: dimPlant;

    @ManyToOne(() => dimShift, shift => shift.shiftConfigShift)
    shift: dimShift;

}