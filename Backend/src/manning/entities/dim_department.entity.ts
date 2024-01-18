import{Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import { dimPosition } from './dim_position.entity';

@Entity()
export class dimDepartment{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    divBis: string;

    @Column({nullable: true})
    divBisCode: string;

    @Column({nullable: true})
    deptmBis: string;

    @Column({nullable: true})
    deptmBisCode: string;

    @OneToMany(() => dimPosition, (position) => position.deptmBis)
    positionDepartment: dimPosition[];
}