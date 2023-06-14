import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './todos.model';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Todo Creating' })
  @ApiResponse({ status: 200, type: () => [Todo] })
  create(@Body() todoDto: CreateTodoDto) {
    return this.todosService.createTodo(todoDto);
  }

  @ApiOperation({ summary: 'Get All Todos' })
  @ApiResponse({ status: 200, type: () => [Todo] })
  @Get()
  getAll() {
    return this.todosService.getAllTodos();
  }

  @Delete('/:todoIds')
  delete(@Param('todoIds') todoIds: string) {
    return this.todosService.deleteTodosByIds(todoIds.split(',').map(Number));
  }

  @Patch('update/:todoId')
  update(
    @Param('todoId') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateTodoFields(todoId, updateTodoDto);
  }
}
