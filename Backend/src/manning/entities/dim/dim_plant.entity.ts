import{Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { plantConfig } from '../configuration/plant_config.entity';

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

    @OneToMany(() => plantConfig, (location) => location.deparment)
    plantConfigPlant: plantConfig[];
}