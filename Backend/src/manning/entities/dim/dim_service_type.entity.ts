import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

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
}