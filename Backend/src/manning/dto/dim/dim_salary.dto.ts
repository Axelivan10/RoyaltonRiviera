import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimSalaryDto {

    @IsNumber()
    id: number;
    
    @IsString()
    divBis: string;

    @IsString()
    divBisCode: string;

    @IsString()
    deptmBis: string;

    @IsString()
    deptmBisCode: string;

    @IsString()
    positionId: string;

    @IsString()
    positionDescription: string;

    @IsNumber()
    jam: number;

    @IsNumber()
    dom: number;

    @IsNumber()
    mex: number;

    @IsNumber()
    cri: number;

    @IsNumber()
    grd: number;

    @IsNumber()
    lca: number;

    @IsNumber()
    atg: number; 
} 