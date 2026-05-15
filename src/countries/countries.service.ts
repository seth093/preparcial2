import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {

  constructor(

    @InjectRepository(Country)
    private countryRepo: Repository<Country>,

    private httpService: HttpService,
  ) {}

  async findByCode(alpha3Code: string): Promise<Country> {

    // Buscar localmente
    const localCountry = await this.countryRepo.findOne({
      where: { alpha3Code },
    });

    // Si existe en cache
    if (localCountry) {
      return localCountry;
    }

    // Buscar en API externa
    const response = await firstValueFrom(
      this.httpService.get(
        `https://restcountries.com/v3.1/alpha/${alpha3Code}`,
      ),
    );

    const data = response.data[0];

    if (!data) {
      throw new NotFoundException('Country not found');
    }

    // Crear país
    const newCountry = this.countryRepo.create({
      alpha3Code,
      name: data.name.common,
      region: data.region,
      capital: data.capital?.[0] || '',
      population: data.population,
      flagUrl: data.flags.png,
    });

    // Guardar cache
    return this.countryRepo.save(newCountry);
  }
}