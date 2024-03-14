import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimParameter } from '../dim/dim_parameter.entity';

    @Entity()
    export class sizeCriteriaOrderConfig{
    
        @PrimaryGeneratedColumn()
        id: number;

        @Column({nullable: true})
        sizeCriteria: string;
    
        @ManyToOne(() => dimParameter, parameter => parameter.sizeCriteriaOrderConfigParameter)
        parameter: dimParameter;
    
        @Column({nullable: true})
        min: number;

        @Column({nullable: true})
        max: number;
    
        @Column({nullable: true})
        size: string;
    }
