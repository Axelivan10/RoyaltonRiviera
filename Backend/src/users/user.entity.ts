import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

// enum userStatus{
//     PENDING = 'Pending',
//     IN_PROGRESS = 'In progress',
//     DONE = 'Done'
// }


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    
    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    code: number

    @Column({nullable: true})
    role:number

    // status: userStatus;
}