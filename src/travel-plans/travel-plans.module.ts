import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelPlan } from './entities/travel-plan.entity';

import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';

import { CountriesModule } from '../countries/countries.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlan]),
    CountriesModule,
    UsersModule,
  ],

  controllers: [TravelPlansController],

  providers: [TravelPlansService],
})
export class TravelPlansModule {}