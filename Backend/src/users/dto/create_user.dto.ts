import {IsString, IsNotEmpty, MinLength} from 'class-validator'
import {} from 'class-transformer'

export class CreateUserDto {
    name: string

    @IsString()
    @IsNotEmpty()
    // @MinLength(11)
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    code:number

    role:number

    expiration:string
} 