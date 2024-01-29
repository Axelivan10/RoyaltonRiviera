import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class dimDivisionDto {

    @IsString()
    position: string;

    locationId: number;

    deparmentId: number;

    // @IsString()
    // xSymbol: string;

    inputValues: {
        id: number;
        position: string;
        xSymbol: string;
        locationIdId: number;
        deparmentIdId: number;
      };
} 