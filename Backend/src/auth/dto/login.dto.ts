import {IsString, IsNotEmpty, MinLength} from 'class-validator'
import {} from 'class-transformer'

export class LoginDto {
    
    @IsString()
    @IsNotEmpty()
    // @MinLength(11)
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    code:string
} 




//SE DEBE REVISAR SI ES NECESARIO ESTE ARCHIVO PORQUE YA TENEMOS UNO EN USER, PERO AUN ASI RVISAR