import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';
import { Length } from 'class-validator/types/decorator/string/Length';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
