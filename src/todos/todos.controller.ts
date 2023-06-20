import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './todos.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @ApiOperation({ summary: 'Todo Creating' })
  @ApiResponse({ status: 200, type: () => Todo })
  @Post()
  create(@Body() todoDto: CreateTodoDto) {
    return this.todosService.createTodo(todoDto);
  }

  @ApiOperation({ summary: 'Get All Todos' })
  @ApiResponse({ status: 200, type: [Todo] })
  @Get()
  getAll() {
    return this.todosService.getAllTodos();
  }

  @ApiOperation({ summary: 'Delete Todos' })
  @ApiResponse({ status: 200, type: () => Todo })
  @Delete('/:todoIds')
  delete(@Param('todoIds') todoIds: string) {
    return this.todosService.deleteTodosByIds(todoIds.split(',').map(Number));
  }

  @ApiOperation({ summary: 'Update Todo' })
  @ApiResponse({ status: 200, type: () => Todo })
  @Patch('update/:todoId')
  update(
    @Param('todoId') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateTodoFields(todoId, updateTodoDto);
  }
}
