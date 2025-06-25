import { IsNotEmpty } from 'class-validator';
import { Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  description: string;
}
