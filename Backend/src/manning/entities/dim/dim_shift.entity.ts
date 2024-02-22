import{Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { shiftConfig } from '../configuration/shift_config.entity';
import { serviceTypeConfig } from '../configuration/serviceType_config.entity';
import { position_locationConfig } from '../configuration/positionxLocation_config.entity';
import { standardTableConfig } from '../configuration/standardTable_config.entity';
import { flowsRestConfig } from '../configuration/flowsRest_config.entity';
import { kitchenGrlConfig } from '../configuration/kitchenGrl_config.entity';

@Entity()
export class dimShift{

    @PrimaryGeneratedColumn()
    shiftId: number;

    @Column({nullable: true})
    shiftCode: string;

    @Column({nullable: true})
    shiftDescription: string;

    @Column({nullable: true})
    shift: string;

    @OneToMany(() => shiftConfig, (shift) => shift.shift)
    shiftConfigShift: shiftConfig[];

    @OneToMany(() => serviceTypeConfig, (serviceType) => serviceType.shift)
    serviceTypeConfigShift: serviceTypeConfig[];

    @OneToMany(() => position_locationConfig, (posloc) => posloc.shift)
    posLocConfigShift: position_locationConfig[];

    @OneToMany(() => standardTableConfig, (standardTable) => standardTable.shift)
    standardTableConfigShift: standardTableConfig[];

    @OneToMany(() => flowsRestConfig, (flowsRest) => flowsRest.shift)
    flowsRestConfigShift: flowsRestConfig[];

    @OneToMany(() => kitchenGrlConfig, (kitchenGrl) => kitchenGrl.shift)
    kitchenGrlConfigShift: kitchenGrlConfig[];

}