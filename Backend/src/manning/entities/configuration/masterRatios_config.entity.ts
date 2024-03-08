import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne} from 'typeorm'
import { dimDepartment } from '../dim/dim_department.entity';
import { dimPosition } from '../dim/dim_position.entity';
import { dimDivision } from '../dim/dim_division.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimParameter } from '../dim/dim_parameter.entity';
import { standardTableConfig } from './standardTable_config.entity';


@Entity()
export class masterRatiosConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => dimPosition, position => position.masterRatiosConfigPosition)
    positiondim: dimPosition;

    @ManyToOne(() => dimDivision, division => division.masterRatiosConfigDivision)
    division: dimDivision;
    
    @ManyToOne(() => dimDepartment, department => department.masterRatiosConfigDepartment)
    department: dimDepartment;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.masterRatiosConfigServiceType)
    serviceType: dimServiceType;

    @ManyToOne(() => dimParameter, parameter => parameter.masterRatiosConfigParameter)
    parameter: dimParameter;

    @ManyToOne(() => standardTableConfig, standardTableConfig => standardTableConfig.masterRatiosConfig)
    standardTableConfig: standardTableConfig;

    @Column({nullable: true})
    mex: number;

    @Column({nullable: true})
    jam: number;

    @Column({nullable: true})
    dom: number;

    @Column({nullable: true})
    cri: number;

    @Column({nullable: true})
    atg: number;

    @Column({nullable: true})
    lca: number;

    @Column({nullable: true})
    grd: number;
}