import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { dimPlant } from './dim/dim_plant.entity';
import { dimPosition } from './dim/dim_position.entity';
import { dimServiceType } from './dim/dim_service_type.entity';
import { dimShift } from './dim/dim_shift.entity';
import { dimParameter } from './dim/dim_parameter.entity';
import { dimLocation } from './dim/dim_location.entity';

@Entity()
export class operations {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => dimPlant, plant => plant.operationsPlant)
    plant: dimPlant;

    @ManyToOne(() => dimPosition, position => position.operationsPosition)
    positiondim: dimPosition;

    @ManyToOne(() => dimShift, shift => shift.operationsShift)
    shift: dimShift;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.operationsServiceType)
    serviceType: dimServiceType;

    @ManyToOne(() => dimLocation, location => location.operationsLocation)
    location: dimLocation;

    @ManyToOne(() => dimParameter, parameter => parameter.operationsParameter)
    parameter: dimParameter;

    @Column({nullable: true})
    parameterValue: number;

    @Column({nullable: true})
    ratio: number;

    @Column({nullable: true})
    paxResult: number;

}