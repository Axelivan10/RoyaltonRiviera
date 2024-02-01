import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimShift } from '../dim/dim_shift.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';


@Entity()
export class serviceTypeConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => dimLocation, location => location.serviceTypeConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.serviceTypeConfigDepartment)
    deparment: dimDepartment;

    @ManyToOne(() => dimPlant, plant => plant.serviceTypeConfigPlant)
    plant: dimPlant;

    @ManyToOne(() => dimShift, shift => shift.serviceTypeConfigShift)
    shift: dimShift;

    @ManyToOne(() => dimServiceType, shift => shift.serviceTypeConfigServiceType)
    serviceType: dimServiceType;
}