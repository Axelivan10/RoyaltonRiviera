import{Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { dimLocation } from '../dim/dim_location.entity';
import { dimDepartment } from '../dim/dim_department.entity';
import { dimParameter } from '../dim/dim_parameter.entity';
import { dimServiceType } from '../dim/dim_service_type.entity';
import { dimShift } from '../dim/dim_shift.entity';


@Entity()
export class kitchenGrlConfig{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    criteria: string;

    @ManyToOne(() => dimParameter, parameter => parameter.flowsGrlConfigParameter)
    parameter: dimParameter;

    @ManyToOne(() => dimServiceType, serviceType => serviceType.flowsRestConfigServiceType)
    serviceType: dimServiceType;

    @ManyToOne(() => dimShift, shift => shift.flowsRestConfigShift)
    shift: dimShift;

    @Column({nullable: true})
    workSt: string;

    @Column({nullable: true})
    servShift: string;

    @Column({nullable: true})
    scc: number;

    @Column({nullable: true})
    scp: string;

    @Column({nullable: true})
    sa: string;

    @Column({nullable: true})
    sb: string;

    @Column({nullable: true})
    sc: string;

    @Column({nullable: true})
    spz: string;

    @Column({nullable: true})
    ssh: string;

    @Column({nullable: true})
    sbf: string;

    @Column({nullable: true})
    mmc: string;

    @Column({nullable: true})
    mcp: string;

    @Column({nullable: true})
    ma: string;

    @Column({nullable: true})
    mb: string;

    @Column({nullable: true})
    mc: string;

    @Column({nullable: true})
    mpz: string;

    @Column({nullable: true})
    msh: string;

    @Column({nullable: true})
    mbf: string;

    @Column({nullable: true})
    lcc: string;

    @Column({nullable: true})
    lcp: string;

    @Column({nullable: true})
    la: string;

    @Column({nullable: true})
    lb: string;

    @Column({nullable: true})
    lc: string;

    @Column({nullable: true})
    lpz: string;

    @Column({nullable: true})
    lsh: string;

    @Column({nullable: true})
    lbf: string;

    @Column({nullable: true})
    xlcc: string;

    @Column({nullable: true})
    xlcp: string;

    @Column({nullable: true})
    xla: string;

    @Column({nullable: true})
    xlb: string;

    @Column({nullable: true})
    xlc: string;

    @Column({nullable: true})
    xlpz: string;

    @Column({nullable: true})
    xlsh: string;

    @Column({nullable: true})
    xlbf: string;
}