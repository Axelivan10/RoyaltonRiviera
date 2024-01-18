import{Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'

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

}