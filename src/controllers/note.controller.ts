import { NextFunction, Request, Response } from 'express';
import { NoteDto } from '../dtos/note.dto';
import { NoteEntity } from '../entity';
import { NoteService } from '../services';
import { GenericResponse } from '../utils/genericResponse';

export class NoteController {
  public noteService = new NoteService();

  public getNoteByNotebookId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notebookId = Number(req.params.id);
      const notes: NoteEntity[] = await this.noteService.getNotesByNotebookId(notebookId);
      const genericResponse: GenericResponse<NoteEntity[]> = { data: notes, result: { resultType: 'SUCCESS' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };

  public createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteDto: NoteDto = req.body;
      const createdNote: NoteDto = await this.noteService.createNote(noteDto);
      const genericResponse: GenericResponse<NoteDto> = { data: createdNote, result: { resultType: 'SUCCESS' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteDto: NoteDto = req.body;
      const updatedNote: NoteDto = await this.noteService.updateNote(noteDto);
      const genericResponse: GenericResponse<NoteDto> = { data: updatedNote, result: { resultType: 'SUCCESS' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteId = req.params.id;
      const isDeleted: boolean = await this.noteService.deleteNote(Number(noteId));
      const genericResponse: GenericResponse<null> = { data: null, result: { resultType: isDeleted ? 'SUCCESS' : 'ERROR' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };
}
