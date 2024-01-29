import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

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
}