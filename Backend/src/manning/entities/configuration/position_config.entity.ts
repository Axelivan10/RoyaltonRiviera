import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimPosition } from '../dim/dim_position.entity';


@Entity()
export class positionConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    xSymbol: string;

    @ManyToOne(() => dimPosition, position => position.positionConfig)
    positiondim: dimPosition;

    @ManyToOne(() => dimLocation, location => location.positionConfig)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.positionConfigDepartment)
    deparment: dimDepartment;

    @ManyToOne(() => dimPlant, plant => plant.positionConfigPlant)
    plant: dimPlant;

}