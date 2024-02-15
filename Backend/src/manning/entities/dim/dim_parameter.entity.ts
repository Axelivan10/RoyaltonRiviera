import{Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { sizeCriteriaConfig } from '../configuration/sizeCriteria_config.entity';
import { standardTableConfig } from '../configuration/standardTable_config.entity';

@Entity()
export class dimParameter{

    @PrimaryGeneratedColumn()
    parameterId: number;

    @Column({nullable: true})
    parameter: string;

    @Column({nullable: true})
    parameterCode: string;

    @Column({nullable: true})
    parameterDescription: string;

    @OneToMany(() => sizeCriteriaConfig, (sizeCriteria) => sizeCriteria.parameter)
    sizeCriteriaConfigParameter: sizeCriteriaConfig[];
    
    @OneToMany(() => standardTableConfig, (standardTable) => standardTable.parameter)
    standardTableConfigParameter: standardTableConfig[];

}