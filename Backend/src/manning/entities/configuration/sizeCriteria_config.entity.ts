import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimParameter } from '../dim/dim_parameter.entity';

    @Entity()
    export class sizeCriteriaConfig{
    
        @PrimaryGeneratedColumn()
        id: number;

        @Column({nullable: true})
        sizeCriteria: string;
    
        @Column({nullable: true})
        position: string;
    
        @Column({nullable: true})
        numberValue: number;
    
        @ManyToOne(() => dimParameter, parameter => parameter.sizeCriteriaConfigParameter)
        parameter: dimParameter;
    
    }
