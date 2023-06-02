import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './todos.model';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  // @ApiOperation({ summary: 'Todo Creating' })
  // @ApiResponse({ status: 200, type:  Todo })
  create(@Body() todoDto: CreateTodoDto) {
    return this.todosService.createTodo(todoDto);
  }

  // @ApiOperation({ summary: 'Get All Todos' })
  // @ApiResponse({ status: 200, type: [Todo] })
  @Get()
  getAll() {
    return this.todosService.getAllTodos();
  }

  // @ApiOperation({ summary: 'Get Todo By Tag' })
  // @ApiResponse({ status: 200, type: Todo })
  @Get('/tag/:tag')
  getByTag(@Param('tag') tag: string) {
    return this.todosService.getTodosByTag(tag);
  }

  // @ApiOperation({ summary: 'Get Todo By User Id' })
  // @ApiResponse({ status: 200, type: Todo })
  @Get('user/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.todosService.getTodosByUser(userId);
  }

  // @ApiOperation({ summary: 'Delete Todo' })
  // @ApiResponse({ status: 200 })
  @Delete('/:todoId')
  delete(@Param('todoId') todoId: number) {
    return this.todosService.deleteTodo(todoId);
  }
}
