import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class AddExpenseDto {

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  category: string;
}