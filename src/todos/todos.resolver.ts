import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
import { CreateTodoInput } from './inputs/create-todo.input';
import { Category } from '../categories/categories.model';
import { UpdateTodoInput } from './inputs/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private todosService: TodosService) {}

  @Query(() => [Todo])
  async todos() {
    return await this.todosService.getAllTodos();
  }

  @ResolveField(() => Category)
  category(@Parent() todo: Todo) {
    return todo.category;
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodo') todoInput: CreateTodoInput,
  ): Promise<Todo> {
    return await this.todosService.createTodo(todoInput);
  }

  @Mutation(() => [Todo])
  async deleteTodo(@Args('todoIds') todoIds: string): Promise<Todo[]> {
    const ids = todoIds.split(',').map(Number);
    return await this.todosService.deleteTodosByIds(ids);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('todoId') todoId: number,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo> {
    return await this.todosService.updateTodoFields(todoId, updateTodoInput);
  }
}
