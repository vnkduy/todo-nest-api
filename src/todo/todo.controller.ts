import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo } from '@prisma/client';
import { createTodoDto } from './dtos/create.dto';
import { ParamTodoIdDto } from './dtos/param.dto';
import { updateTodoDto } from './dtos/update.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('')
  createTodo(@Body() body: createTodoDto): Promise<string> {
    return this.todoService.createTodo(body);
  }

  @Get('')
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.getAllTodo();
  }

  @Get(':id')
  getTodoById(@Param() params: ParamTodoIdDto): Promise<Todo> {
    return this.todoService.getTodoById(params.id);
  }

  @Patch(':id')
  updateTodo(
    @Param() params: ParamTodoIdDto,
    @Body() body: updateTodoDto,
  ): Promise<string> {
    console.log('🚀 ~ TodoController ~ params:', params);
    return this.todoService.updateTodo(params.id, body);
  }

  @Delete(':id')
  deleteTodo(@Param() params: ParamTodoIdDto): Promise<string> {
    return this.todoService.deleteTodo(params.id);
  }
}
