import { IsNotEmpty, IsNumber } from 'class-validator';

export class NotebookDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
