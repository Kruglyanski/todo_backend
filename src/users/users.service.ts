import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(dto: CreateUserDto | CreateUserInput) {
    const { password, email } = dto;

    const user = await this.usersRepository.save({ password, email });

    return user;
  }

  public async getUserByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }
}
