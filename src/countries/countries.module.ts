import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    HttpModule,
  ],

  providers: [CountriesService],

  exports: [CountriesService],
})
export class CountriesModule {}