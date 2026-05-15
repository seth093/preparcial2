import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TravelPlan } from './entities/travel-plan.entity';

import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { AddExpenseDto } from './dto/add-expense.dto';

import { CountriesService } from '../countries/countries.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TravelPlansService {

  constructor(

    @InjectRepository(TravelPlan)
    private travelPlanRepo: Repository<TravelPlan>,

    private countriesService: CountriesService,

    private usersService: UsersService,
  ) {}

  async create(dto: CreateTravelPlanDto) {

    // Verificar usuario
    const user = await this.usersService.findOne(dto.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar país
    await this.countriesService.findByCode(dto.countryCode);

    // Crear plan
    const plan = this.travelPlanRepo.create({
      ...dto,
      expenses: [],
    });

    return this.travelPlanRepo.save(plan);
  }

  async addExpense(
    id: number,
    dto: AddExpenseDto,
  ) {

    const plan = await this.findOne(id);

    if (!plan.expenses) {
      plan.expenses = [];
    }

    plan.expenses.push(dto);

    return this.travelPlanRepo.save(plan);
  }

  async findAll() {
    return this.travelPlanRepo.find();
  }

  async findOne(id: number) {

    const plan = await this.travelPlanRepo.findOne({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException('Travel plan not found');
    }

    return plan;
  }

  async remove(id: number) {

    const plan = await this.findOne(id);

    return this.travelPlanRepo.remove(plan);
  }
}
