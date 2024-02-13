import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimPosition } from '../dim/dim_position.entity';


@Entity()
export class position_locationConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    xSymbol: string;

    @ManyToOne(() => dimLocation, location => location.positionLlocationConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.posLocConfigDepartment)
    deparment: dimDepartment;

    @ManyToOne(() => dimPlant, plant => plant.posLocConfigPlant)
    plant: dimPlant;

    @ManyToOne(() => dimShift, shift => shift.posLocConfigShift) //opcional
    shift: dimShift;

    @ManyToOne(() => dimPosition, position => position.posLocConfigPosition)
    dimPosition: dimPosition;
}