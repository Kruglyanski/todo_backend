import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todos.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
   constructor(
    @InjectRepository(Todo) 
    private todosRepository: Repository<Todo>,
    ) {}

  async createTodo(todoDto: CreateTodoDto) {
    const todo = await this.todosRepository.save(todoDto);
    return todo;
  }

  async getAllTodos() {
    const todos = await this.todosRepository.find({ relations: ['category'] });
    return todos;
  }

  async getTodosByTag(value: string) {
    // const todo = await this.todosRepository.findAll({where: {tag: value}});
    // return todo;
  }

  async getTodosByUser(id: number) {
    // const todo = await this.todosRepository.findBy({where: {userId: id}});
    // return todo;
  }

  async deleteTodo(id: number) {
    const todo = await this.todosRepository.delete(id);
    return todo;
  }
}
