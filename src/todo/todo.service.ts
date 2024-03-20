import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { createTodoDto } from './dtos/create.dto';
import { updateTodoDto } from './dtos/update.dto';

@Injectable()
export class TodoService {
  constructor(private primaService: PrismaService) {}

  createTodo = async (todoData: createTodoDto): Promise<string> => {
    const todo = await this.primaService.todo.findUnique({
      where: {
        title: todoData.title,
      },
    });

    if (todo) {
      throw new HttpException(
        {
          message: 'This title has been used',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.primaService.todo.create({
      data: todoData,
    });

    return res.id;
  };

  getAllTodo = async (): Promise<Todo[]> => {
    const todo = await this.primaService.todo.findMany();
    return todo;
  };

  getTodoById = async (id: string): Promise<Todo> => {
    const todo = await this.primaService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new HttpException(
        {
          message: 'Todo not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return todo;
  };

  updateTodo = async (
    id: string,
    { completed, title }: updateTodoDto,
  ): Promise<string> => {
    const todo = await this.primaService.todo.findUnique({
      where: {
        title,
      },
    });

    if (todo) {
      throw new HttpException(
        {
          message: 'This title has been used',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.primaService.todo.update({
      where: {
        id,
      },
      data: {
        title,
        completed,
      },
    });
    return res.id;
  };

  deleteTodo = async (id: string): Promise<string> => {
    const todo = await this.primaService.todo.delete({
      where: {
        id,
      },
    });
    return todo.id;
  };
}
