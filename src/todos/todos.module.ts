import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './todos.model';
import { Category } from '../categories/categories.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../categories/categories.module';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([Category, Todo]), CategoryModule],
  exports: [TodosService],
})
export class TodosModule {}
