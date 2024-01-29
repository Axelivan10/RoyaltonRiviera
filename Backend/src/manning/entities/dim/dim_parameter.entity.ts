import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

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
}