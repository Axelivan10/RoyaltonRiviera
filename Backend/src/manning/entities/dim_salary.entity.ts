import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class dimSalary{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    divBis: string;

    @Column({nullable: true})
    divBisCode: string;

    @Column({nullable: true})
    deptmBis: string;

    @Column({nullable: true})
    deptmBisCode: string;

    @Column({nullable: true})
    positionId: string;

    @Column({nullable: true})
    positionDescription: string;

    @Column({nullable: true})
    jam: number;

    @Column({nullable: true})
    dom: number;

    @Column({nullable: true})
    mex: number;

    @Column({nullable: true})
    cri: number;

    @Column({nullable: true})
    grd: number;

    @Column({nullable: true})
    lca: number;

    @Column({nullable: true})
    atg: number;  
}