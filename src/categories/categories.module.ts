import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { Todo } from '../todos/todos.model';
import { Category } from './categories.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { CategoriesResolver } from './categories.resolver';
import { TodosModule } from '../todos/todos.module';
import { TodosService } from '../todos/todos.service';

@Module({
  providers: [CategoryService, CategoriesResolver, TodosService],
  controllers: [CategoryController],
  imports: [
    TypeOrmModule.forFeature([Category, Todo, User]),
    UsersModule,
    AuthModule,
    forwardRef(() => TodosModule),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
