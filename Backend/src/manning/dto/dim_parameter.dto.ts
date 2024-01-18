import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimParameterDto {

    @IsNumber()
    parameterId: number;

    @IsString()
    parameter: string;

    @IsString()
    parameterCode: string;

    @IsString()
    parameterDescription: string;
        
} 