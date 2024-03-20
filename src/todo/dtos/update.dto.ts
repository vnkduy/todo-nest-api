import { MinLength } from 'class-validator';

export class updateTodoDto {
  @MinLength(6)
  title: string;

  completed: boolean;
}
