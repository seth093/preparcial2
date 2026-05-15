import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTravelPlanDto {

  @IsNotEmpty()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  countryCode: string;
}
