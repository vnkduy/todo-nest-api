import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @MinLength(6)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  title: string;
}
