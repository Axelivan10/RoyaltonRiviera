import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator'

export class dimPlantDto {

  id:number;

  // @IsString()
  region: string;

  // @IsString()
  countryCode: string;

  // @IsString()
  country: string;

  // @IsString()
  brand: string;

  // @IsString()
  brandCode: string;

  // @IsNumber()
  plantId: number;

  // @IsString()
  plantCode: string;

  // @IsString()
  plantDescription: string;

  // @IsNumber()
  rooms: number;

  // @IsString()
  size: string;

  // @IsNumber()
  sizeRank: number;

  // @IsNumber()
  countryRank: number;

  editValues: {
    id: number;
    brand: string;
    brandCode: string;
    company: string;
    country: string;
    countryCode: string;
    countryRank: number;
    plantCode: string;
    plantDescription: string;
    plantId: number;
    region: string;
    rooms: number;
    size: string;
    sizeRank: number;
  };
} 