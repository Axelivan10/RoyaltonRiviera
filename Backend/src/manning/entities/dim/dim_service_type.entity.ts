import{Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { serviceTypeConfig } from '../configuration/serviceType_config.entity';
import { standardTableConfig } from '../configuration/standardTable_config.entity';
import { flowsRestConfig } from '../configuration/flowsRest_config.entity';
import { kitchenGrlConfig } from '../configuration/kitchenGrl_config.entity';
import { kitchenBackConfig } from '../configuration/kitchenBack_config.entity';
import { adaptedHConfig } from '../configuration/adaptedH_config.entity';
import { adaptedRConfig } from '../configuration/adaptedR_config.entity';
import { operations } from '../operations.entity';
import { masterRatiosConfig } from '../configuration/masterRatios_config.entity';

@Entity()
export class dimServiceType{

    @PrimaryGeneratedColumn()
    serviceTypeId: number;

    @Column({nullable: true})
    serviceTypeCode: string;

    @Column({nullable: true})
    serviceTypeCode2: string;

    @Column({nullable: true})
    serviceTypeCode3: string;
    
    @Column({nullable: true})
    serviceTypeDescription: string;

    @OneToMany(() => serviceTypeConfig, (serviceType) => serviceType.serviceType)
    serviceTypeConfigServiceType: serviceTypeConfig[];

    @OneToMany(() => standardTableConfig, (standardTable) => standardTable.serviceType)
    standardTableConfigServiceType: standardTableConfig[];

    @OneToMany(() => kitchenGrlConfig, (kitchenGrl) => kitchenGrl.serviceType)
    kitchenGrlConfigServiceType: kitchenGrlConfig[];

    @OneToMany(() => flowsRestConfig, (flowsRest) => flowsRest.serviceType)
    flowsRestConfigServiceType: flowsRestConfig[];

    @OneToMany(() => kitchenBackConfig, (kitchenBack) => kitchenBack.serviceType)
    kitchenBackConfigServiceType: kitchenBackConfig[];

    @OneToMany(() => adaptedHConfig, (adaptedH) => adaptedH.serviceType)
    adaptedHConfigServiceType: adaptedHConfig[];

    @OneToMany(() => adaptedRConfig, (adaptedR) => adaptedR.serviceType)
    adaptedRConfigServiceType: adaptedRConfig[];

    @OneToMany(() => operations, (operations) => operations.serviceType)
    operationsServiceType: operations[];

    @OneToMany(() => masterRatiosConfig, (masterRatios) => masterRatios.serviceType)
    masterRatiosConfigServiceType: masterRatiosConfig[];
}

