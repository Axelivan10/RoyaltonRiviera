import{Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { plantConfig } from '../configuration/plant_config.entity';
import { shiftConfig } from '../configuration/shift_config.entity';
import { serviceTypeConfig } from '../configuration/serviceType_config.entity';
import { positionConfig } from '../configuration/position_config.entity';
import { position_locationConfig } from '../configuration/positionxLocation_config.entity';
import { flowsRestConfig } from '../configuration/flowsRest_config.entity';
import { kitchenBackConfig } from '../configuration/kitchenBack_config.entity';
import { adaptedHConfig } from '../configuration/adaptedH_config.entity';
import { absentessiemConfig } from '../configuration/Absentessiem_config.entity';

@Entity()
export class dimPlant{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    company: string;

    @Column({nullable: true})
    region: string;

    @Column({nullable: true})
    countryCode: string;

    @Column({nullable: true})
    country: string;
    
    @Column({nullable: true})
    brand: string;

    @Column({nullable: true}) 
    brandCode: string

    @Column({nullable: true})
    plantId: number;

    @Column({nullable: true})
    plantCode: string;

    @Column({nullable: true})
    plantDescription: string;

    @Column({nullable: true})
    rooms: number;

    @Column({nullable: true})
    size: string;

    @Column({nullable: true})
    sizeRank: number;

    @Column({nullable: true})
    countryRank: number;

    @OneToMany(() => plantConfig, (location) => location.plant)
    plantConfigPlant: plantConfig[];

    @OneToMany(() => shiftConfig, (shift) => shift.plant)
    shiftConfigPlant: shiftConfig[];

    @OneToMany(() => serviceTypeConfig, (serviceType) => serviceType.plant)
    serviceTypeConfigPlant: serviceTypeConfig[];

    @OneToMany(() => positionConfig, (position) => position.plant)
    positionConfigPlant: positionConfig[];

    @OneToMany(() => position_locationConfig, (posloc) => posloc.plant)
    posLocConfigPlant: position_locationConfig[];

    @OneToMany(() => flowsRestConfig, (flowsRest) => flowsRest.plant)
    flowsRestConfigPlant: flowsRestConfig[];

    @OneToMany(() => kitchenBackConfig, (kitchenBack) => kitchenBack.plant)
    kitchenBackConfigPlant: kitchenBackConfig[];

    @OneToMany(() => adaptedHConfig, (adaptedH) => adaptedH.plant)
    adaptedHConfigPlant: adaptedHConfig[];
    
    @OneToMany(() => absentessiemConfig, (absentessiem) => absentessiem.plant)
    absentessiemConfigPlant: absentessiemConfig[];
}