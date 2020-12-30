import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { NotebookEntity } from './notebook.entity';

@Entity()
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @JoinColumn({ name: 'notebookId' })
  @ManyToOne(() => NotebookEntity, notebookEntity => notebookEntity, { nullable: false })
  notebook: NotebookEntity;

  @Column()
  public notebookId: number;
}
