import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { CreateTodoInput } from './inputs/create-todo.input';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createTodo(todoDto: CreateTodoDto | CreateTodoInput) {
    const category = await this.categoriesRepository.findOne({
      where: { id: todoDto.categoryId },
    });

    return await this.todosRepository.save({ ...todoDto, category });
  }

  async getAllTodos() {
    return await this.todosRepository.find({ relations: ['category'] });
  }

  async deleteTodo(id: number) {
    return await this.todosRepository.delete(id);
  }

  async deleteTodosByIds(ids: number[]) {
    return await this.todosRepository
      .createQueryBuilder()
      .delete()
      .andWhere('id IN (:...ids)', { ids })
      .returning('*')
      .execute()
      .then((result) => result.raw);
  }

  async updateTodoFields(id: number, fieldsToUpdate: Partial<Todo>) {
    return await this.todosRepository
      .createQueryBuilder()
      .update(Todo)
      .set(fieldsToUpdate)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((res) => res.raw[0]);
  }
}
