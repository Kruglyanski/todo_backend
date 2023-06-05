import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { password, email, roleIds } = dto;
    const roles =
      roleIds &&
      (await this.rolesRepository.find({ where: { id: In(roleIds) } }));
    const user = await this.usersRepository.save({ password, email, roles });

    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations: ['categories', 'roles'],
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }
}
