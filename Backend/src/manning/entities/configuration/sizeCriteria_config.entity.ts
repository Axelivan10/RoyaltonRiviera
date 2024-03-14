import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimParameter } from '../dim/dim_parameter.entity';

    @Entity()
    export class sizeCriteriaConfig{
    
        @PrimaryGeneratedColumn()
        id: number;

        @Column({nullable: true})
        sizeCriteria: string;
    
        @ManyToOne(() => dimParameter, parameter => parameter.sizeCriteriaConfigParameter)
        parameter: dimParameter;
    
        @Column({nullable: true})
        xSmallMinValue: number;

        @Column({nullable: true})
        xSmallMaxValue: number;

        @Column({nullable: true})
        smallMinValue: number;

        @Column({nullable: true})
        smallMaxValue: number;

        @Column({nullable: true})
        mediumMinValue: number;

        @Column({nullable: true})
        mediumMaxValue: number;

        @Column({nullable: true})
        largeMinValue: number;

        @Column({nullable: true})
        largeMaxValue: number;

        @Column({nullable: true})
        xlargeMinValue: number;

        @Column({nullable: true})
        xlargeMaxValue: number;
    
    }
