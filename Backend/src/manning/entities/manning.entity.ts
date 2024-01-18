import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Manning{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    hotel: string;

    @Column({nullable: true})   //YO PIENSO QUE ESTO SERÁ UN CATALOGO
    region: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    division: string;
    
    @Column({nullable: true})
    department: string;

    //{unique:true}
    @Column({nullable: true}) // PREGUNTAR SI ES NECESARIO HACER UN QUERY PARA QUE NO SE CREE UNA POSICION YA EXISTENTE EN UN HOTEL, PERO QUE SI SE PUEDA CREAR CUANDO NO EXISTE EN UN HOTEL
    position: string

    @Column({nullable: true})
    cincuenta: number;

    @Column({nullable: true})
    sesenta: number;

    @Column({nullable: true})
    setenta: number;

    @Column({nullable: true})
    ochenta: number;

    @Column({nullable: true})
    noventa: number;

    @Column({nullable: true})
    area: string;

    @Column({nullable: true})
    parameter: string;

    @Column({nullable: true})
    parameterValue: string;
}