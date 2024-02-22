import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPlant } from '../dim/dim_plant.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimShift } from '../dim/dim_shift.entity';


@Entity()
export class flowsRestConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => dimPlant, plant => plant.flowsRestConfigPlant)
    plant: dimPlant;

    @ManyToOne(() => dimLocation, location => location.flowsRestConfigLocation)
    location: dimLocation;

    @ManyToOne(() => dimDepartment, department => department.flowsRestConfigDepartment)
    department: dimDepartment;

    @Column({nullable: true})
    criteria: string;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.flowsRestConfigServiceType)
    serviceType: dimServiceType;

    @Column({nullable: true})
    capacity: number;

    @ManyToOne(() => dimShift, shift => shift.flowsRestConfigShift)
    shift: dimShift;

    @Column({nullable: true})
    twenty: number;

    @Column({nullable: true})
    thirty: number;

    @Column({nullable: true})
    forty: number;

    @Column({nullable: true})
    fifty: number;

    @Column({nullable: true})
    sixty: number;

    @Column({nullable: true})
    seventy: number;

    @Column({nullable: true})
    eighty: number;

    @Column({nullable: true})
    ninety: number;

    @Column({nullable: true})
    rate: number;
}