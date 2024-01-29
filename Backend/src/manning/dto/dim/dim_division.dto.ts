import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class dimDivisionDto {

    @IsString()
    divBis: string

    @IsString()
    divBisCode: string;
} 