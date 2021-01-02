import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Exclude()
export class NoteDto {
  @Expose()
  id: number;

  @Expose()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsNotEmpty()
  details: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  notebookId: number;
}
