import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { NoteDto } from '../dtos/note.dto';
import { NotebookEntity, NoteEntity, UserEntity } from '../entity';
import HttpException from '../exceptions/HttpException';

export class NoteService {
  public noteEntity = NoteEntity;
  public notebookEntity = NotebookEntity;
  public userEntity = UserEntity;

  public async getNotesByNotebookId(notebookId: number): Promise<NoteEntity[]> {
    const noteRepository = getRepository(this.noteEntity);
    return await noteRepository.find({ where: { notebookId } });
  }

  public async createNote(noteDto: NoteDto): Promise<NoteDto> {
    const noteRepository = getRepository(this.noteEntity);
    const notebookRepository = getRepository(this.notebookEntity);
    const noteEntity: NoteEntity = plainToClass(NoteEntity, noteDto);
    const notebook: NotebookEntity = await notebookRepository.findOne({ where: { id: noteDto.notebookId } });
    const savedEntity = noteRepository.save({ ...noteEntity, notebook });
    if (!savedEntity) throw new HttpException(500, 'Note can not created.');
    return plainToClass(NoteDto, savedEntity);
  }

  public async updateNote(noteDto: NoteDto): Promise<NoteDto> {
    const noteEntity = plainToClass(NoteEntity, noteDto);
    const noteRepository = getRepository(this.noteEntity);
    const updatedNote = await noteRepository.update(noteEntity.id, noteEntity);
    if (!updatedNote) throw new HttpException(500, 'Note can not updated.');
    return plainToClass(NoteDto, updatedNote);
  }

  public async deleteNote(noteId: number): Promise<boolean> {
    const noteRepository = getRepository(this.noteEntity);
    const noteEntity = await noteRepository.findOne({ where: { id: noteId } });
    if (!noteEntity) throw new HttpException(404, 'Note can not be found. Note ID: ' + noteId);

    const deleted = await noteRepository.delete({ id: noteId });

    return !!deleted;
  }
}
