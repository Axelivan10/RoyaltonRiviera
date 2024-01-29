import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimServiceTypeDto {

    @IsNumber()
    serviceTypeId: number;

    @IsString()
    serviceTypeCode: string;

    @IsString()
    serviceTypeCode2: string;

    @IsString()
    serviceTypeCode3: string;
    
    @IsString()
    serviceTypeDescription: string;
        
} 