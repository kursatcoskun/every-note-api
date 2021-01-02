import { Router } from 'express';
import { NoteController } from '../controllers';
import Route from '../interfaces/routes.interface';

class NoteRoute implements Route {
  public router = Router();
  public path = '/note';
  public noteController = new NoteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getNotesByNotebookId/:id(\\d+)`, this.noteController.getNoteByNotebookId);
    this.router.post(`${this.path}/createNote`, this.noteController.createNote);
    this.router.put(`${this.path}/updateNote`, this.noteController.updateNote);
    this.router.delete(`${this.path}/deleteNote/:id(\\d+)`, this.noteController.deleteNote);
  }
}

export default NoteRoute;
