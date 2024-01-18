import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class dimDepartmentDto {

    @IsString()
    divBis: string

    @IsString()
    divBisCode: string;

    @IsString()
    deptmBis: string;
    
    @IsString()
    deptmBisCode: string;
        
} 