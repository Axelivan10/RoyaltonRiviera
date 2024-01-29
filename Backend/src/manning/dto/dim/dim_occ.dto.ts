import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimOccDto {

    @IsNumber()
    occupation: number

    @IsString()
    occupationCode: string;
} 