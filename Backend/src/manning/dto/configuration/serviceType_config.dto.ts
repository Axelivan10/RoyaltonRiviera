import {IsString, IsNotEmpty, MinLength} from 'class-validator'

export class serviceTypeConfigDto {

    id: number;

    position: string;

    xSymbol: string;

    positiondim: number;

    location: number;

    deparment: number;

    plant: number;

    dataValues: {
        id: number;
        deparment: {
          id: number;
          deptmBis: string;
          divBis:string
        };
        location: {
          id: number;
          area: string;
        };
        plant: {
          id: number;
          countryCode: string;
          plantCode: string;
          plantDescription: string;
        };
        shift: {
          shiftId: number;
          shift: string;
        };
        serviceType: {
          serviceTypeId: number;
          serviceTypeCode: string;
        };
      }

} 