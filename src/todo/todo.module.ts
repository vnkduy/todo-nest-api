import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TodoController],
  providers: [PrismaService, TodoService],
})
export class TodoModule {}
