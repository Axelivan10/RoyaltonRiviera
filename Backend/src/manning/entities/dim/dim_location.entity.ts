import{Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'
import { locationConfig } from '../configuration/location_config.entity';
import { plantConfig } from '../configuration/plant_config.entity';
import { shiftConfig } from '../configuration/shift_config.entity';
import { serviceTypeConfig } from '../configuration/serviceType_config.entity';
import { positionConfig } from '../configuration/position_config.entity';
import { position_locationConfig } from '../configuration/positionxLocation_config.entity';
import { flowsRestConfig } from '../configuration/flowsRest_config.entity';

@Entity()
export class dimLocation{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    sectorCode: string;

    @Column({nullable: true})
    sector: string;

    @Column({nullable: true})
    zoneCode: string;

    @Column({nullable: true})
    zone: string;

    @Column({nullable: true})
    areaCode: string;

    @Column({nullable: true})
    area: string;

    @Column({nullable: true})
    capacity: string;

    @OneToMany(() => locationConfig, (location) => location.location)
    locationConfigLocation: locationConfig[];

    @OneToMany(() => plantConfig, (plant) => plant.location)
    plantConfigLocation: plantConfig[];

    @OneToMany(() => shiftConfig, (shift) => shift.location)
    shiftConfigLocation: shiftConfig[];

    @OneToMany(() => serviceTypeConfig, (serviceType) => serviceType.location)
    serviceTypeConfigLocation: serviceTypeConfig[];

    @OneToMany(() => positionConfig, (position) => position.location)
    positionConfigLocation: positionConfig[];

    @OneToMany(() => position_locationConfig, (location) => location.location)
    positionLlocationConfigLocation: position_locationConfig[];

    @OneToMany(() => flowsRestConfig, (flowsRest) => flowsRest.location)
    flowsRestConfigLocation: flowsRestConfig[];
}