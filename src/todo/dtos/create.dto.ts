import { MinLength } from 'class-validator';

export class createTodoDto {
  @MinLength(6)
  title: string;
}
