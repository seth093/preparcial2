import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOne(id: number) {

    return this.userRepo.findOne({
      where: { id },
    });
  }

  async create(name: string, email: string) {

    const user = this.userRepo.create({
      name,
      email,
    });

    return this.userRepo.save(user);
  }
}