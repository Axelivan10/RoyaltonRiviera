import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimShiftDto {

    @IsNumber()
    shiftId: number;

    @IsString()
    shiftCode: string;

    @IsString()
    shiftDescription: string;

    @IsString()
    shift: string;
        
} 