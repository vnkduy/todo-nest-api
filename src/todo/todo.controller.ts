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
import { CreateTodoDto } from './dtos/create.dto';
import { ParamTodoIdDto } from './dtos/param.dto';
import { UpdateTodoDto } from './dtos/update.dto';
import { TodoService } from './todo.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('')
  createTodo(@Body() body: CreateTodoDto, @GetUser() user): Promise<string> {
    console.log('🚀 ~ TodoController ~ user:', user);
    return this.todoService.createTodo(body, user);
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
    @Body() body: UpdateTodoDto,
  ): Promise<string> {
    return this.todoService.updateTodo(params.id, body);
  }

  @Delete(':id')
  deleteTodo(@Param() params: ParamTodoIdDto): Promise<void> {
    return this.todoService.deleteTodo(params.id);
  }
}
