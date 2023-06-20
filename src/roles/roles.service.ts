import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.save(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({
      where: { value },
      relations: ['users'],
    });
    return role;
  }

  async getAllRoles() {
    const role = await this.rolesRepository.find({ relations: ['users'] });
    return role;
  }
}
