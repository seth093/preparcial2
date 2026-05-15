import {
  Module,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { UsersModule } from './users/users.module';

import { AuditMiddleware } from './common/middleware/audit.middleware';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),

    CountriesModule,
    TravelPlansModule,
    UsersModule,
  ],
})
export class AppModule
  implements NestModule {

  configure(
    consumer: MiddlewareConsumer,
  ) {

    consumer
      .apply(AuditMiddleware)
      .forRoutes('*');
  }
}