import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateTravelPlanDto {

  @IsNotEmpty()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  countryCode: string;

  @IsNumber()
  userId: number;
}