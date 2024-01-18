import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimPlantDto {

    @IsString()
    region: string

    @IsString()
    countryCode: string;

    @IsString()
    country: string;
    
    @IsString()
    brand: string;

    @IsString()
    brandCode: string

    @IsNumber()
    plantId: number;

    @IsString()
    plantCode: string;
    
    @IsString()
    plantDescription: string;
        
    @IsNumber()
    rooms: number;

    @IsString()
    size: string;

    @IsNumber()
    sizeRank: number;

    @IsNumber()
    countryRank: number;
} 