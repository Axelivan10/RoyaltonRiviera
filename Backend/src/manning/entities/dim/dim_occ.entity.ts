import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class dimOcc{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    occupation: number;

    @Column({nullable: true})
    occupationCode: string;
}