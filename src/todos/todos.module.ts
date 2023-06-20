import { Module, forwardRef } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './todos.entity';
import { Category } from '../categories/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../categories/categories.module';
import { TodosResolver } from './todos.resolver';

@Module({
  providers: [TodosService, TodosResolver],
  controllers: [TodosController],
  imports: [
    TypeOrmModule.forFeature([Category, Todo]),
    forwardRef(() => CategoryModule),
  ],
  exports: [TodosService],
})
export class TodosModule {}
