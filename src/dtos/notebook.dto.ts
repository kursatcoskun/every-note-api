import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Exclude()
export class NotebookDto {
  @IsNotEmpty()
  @Expose()
  id: number;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
