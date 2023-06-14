import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todos.model';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { Category } from '../categories/categories.model';
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
    const todo = await this.todosRepository.save({ ...todoDto, category });

    return todo;
  }

  async getAllTodos() {
    const todos = await this.todosRepository.find({ relations: ['category'] });
    return todos;
  }

  async deleteTodo(id: number) {
    const todo = await this.todosRepository.delete(id);
    return todo;
  }

  async deleteTodosByIds(ids: number[]) {
    const deletedTodos: Todo[] = await this.todosRepository
      .createQueryBuilder()
      .delete()
      .andWhere('id IN (:...ids)', { ids })
      .returning('*')
      .execute()
      .then((result) => result.raw);

    return deletedTodos;
  }

  async updateTodoFields(id: number, fieldsToUpdate: Partial<Todo>) {
    const updatedTodo: Todo = await this.todosRepository
      .createQueryBuilder('todos')
      .leftJoinAndSelect('todos.category', 'category')
      .update(Todo)
      .set(fieldsToUpdate)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((res) => res.raw[0]);

    return updatedTodo;
  }
}
