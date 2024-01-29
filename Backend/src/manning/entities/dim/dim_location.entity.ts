import{Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'
import { locationConfig } from '../configuration/location_config.entity';
import { plantConfig } from '../configuration/plant_config.entity';

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

    @OneToMany(() => plantConfig, (location) => location.location)
    plantConfigLocation: plantConfig[];
}