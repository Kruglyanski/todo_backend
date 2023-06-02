import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/categories.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User, Category, Role]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
