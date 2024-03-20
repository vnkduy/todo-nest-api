import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTodoDto } from './dtos/create.dto';
import { UpdateTodoDto } from './dtos/update.dto';

@Injectable()
export class TodoService {
  constructor(private primaService: PrismaService) {}

  async createTodo(todoData: CreateTodoDto): Promise<string> {
    try {
      const res = await this.primaService.todo.create({
        data: todoData,
      });

      return res.id;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  getAllTodo = async (): Promise<Todo[]> => {
    return await this.primaService.todo.findMany();
  };

  async getTodoById(id: string): Promise<Todo> {
    const todo = await this.primaService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async updateTodo(
    id: string,
    { completed, title }: UpdateTodoDto,
  ): Promise<string> {
    try {
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
    } catch (error) {
      throw new Error();
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      await this.primaService.todo.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error();
    }
  }
}
