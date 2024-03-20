import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
