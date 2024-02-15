import{Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { serviceTypeConfig } from '../configuration/serviceType_config.entity';
import { standardTableConfig } from '../configuration/standardTable_config.entity';

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
}

