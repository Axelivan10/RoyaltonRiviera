import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class dimPositionDto {

    @IsString()
    positionDescriptionEN: string;

    @IsString()
    divBis: string;
    
    @IsString()
    divBisCode: string;

    @IsString() 
    deptmBis: string

    @IsString()
    deptmBisCode: string;

    @IsString()
    divisionId: string;

    @IsString()
    divisionCode: string;

    @IsString()
    departmentId: string;

    @IsString()
    departmentCode: string;

    @IsString()
    financeDivisionCode: string;

    @IsString()
    areaNombre: string;

    @IsString()
    deptoClave: string;

    @IsString()
    deptoNombre: string;

    @IsString()
    groupLevel: string;

    @IsString()
    benefitLevel: string;

    @IsString()
    benefit: string;

    @IsString()
    regionalCorp: string;
        
} 