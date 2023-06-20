import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './roles.entity';
import { User } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

//РОЛИ не юзаются, просто были задумки

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role, User])],
  exports: [RolesService],
})
export class RolesModule {}
