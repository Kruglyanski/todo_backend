import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { Todo } from '../todos/todos.model';
import { Category } from './categories.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.model';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    TypeOrmModule.forFeature([Category, Todo, User])
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
