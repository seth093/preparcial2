import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { UsersService } from './users/users.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const usersService = app.get(UsersService);

  await usersService.create(
    'Kevin Arenas',
    'kevin@gmail.com',
  );

  await app.listen(3000);
}

bootstrap();