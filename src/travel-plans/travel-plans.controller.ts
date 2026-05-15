import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { TravelPlansService } from './travel-plans.service';

import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { AddExpenseDto } from './dto/add-expense.dto';

@Controller('travel-plans')
export class TravelPlansController {

  constructor(
    private readonly travelPlansService: TravelPlansService,
  ) {}

  @Post()
  create(@Body() dto: CreateTravelPlanDto) {
    return this.travelPlansService.create(dto);
  }

  @Post(':id/expenses')
  addExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddExpenseDto,
  ) {
    return this.travelPlansService.addExpense(id, dto);
  }

  @Get()
  findAll() {
    return this.travelPlansService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.travelPlansService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.travelPlansService.remove(id);
  }
}