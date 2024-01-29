import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class plantConfigDto {

    id: number;

    position: string;

    xSymbol: string;

    location: number;

    deparment: number;

    plant: number;
} 