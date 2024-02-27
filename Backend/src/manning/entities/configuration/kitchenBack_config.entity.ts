import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimPlant } from '../dim/dim_plant.entity';


@Entity()
export class kitchenBackConfig {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    position: string;

    @Column({nullable: true})
    numberValue: number;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.kitchenBackConfigServiceType)
    serviceType: dimServiceType;

    @ManyToOne(() => dimShift, shift => shift.kitchenBackConfigShift)
    shift: dimShift;
    
    @ManyToOne(() => dimPosition, position => position.kitchenBackConfigPosition)
    positiondim: dimPosition;

    @ManyToOne(() => dimPlant, plant => plant.kitchenBackConfigPlant)
    plant: dimPlant;
}