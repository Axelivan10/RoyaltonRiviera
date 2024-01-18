import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class dimLocationDto {

    @IsString()
    sectorCode: string

    @IsString()
    sector: string;

    @IsString()
    zoneCode: string;
    
    @IsString()
    zone: string;
        
    @IsString()
    areaCode: string;

    @IsString()
    area: string;
    
    @IsString()
    capacity: string;
} 