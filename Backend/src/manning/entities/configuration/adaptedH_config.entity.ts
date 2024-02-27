import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { dimPlant } from '../dim/dim_plant.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimLocation } from '../dim/dim_location.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimShift } from '../dim/dim_shift.entity';


@Entity()
export class adaptedHConfig {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => dimPlant, plant => plant.adaptedHConfigPlant)
    plant: dimPlant;

    @ManyToOne(() => dimPosition, position => position.adaptedHConfigPosition)
    positiondim: dimPosition;

    @ManyToOne(() => dimLocation, location => location.adaptedHConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.adaptedHConfigServiceType)
    serviceType: dimServiceType;

    @Column({nullable: true})
    workSt: number;

    @Column({nullable: true})
    am: number;

    @Column({nullable: true})
    mid: number;

    @Column({nullable: true})
    pm: number;

    @Column({nullable: true})
    lt: number;
}