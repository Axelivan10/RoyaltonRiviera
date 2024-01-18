import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { dimPosition } from './dim_position.entity';

@Entity()
export class dimDivision{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    divBis: string;

    @Column({nullable: true})
    divBisCode: string;

    @OneToMany(() => dimPosition, (position) => position.divBis)
    @JoinColumn({name: 'location_id'})
    positionsDivision: dimPosition[];
}