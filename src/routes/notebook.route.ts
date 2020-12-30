import { Router } from 'express';
import { NotebookController } from '../controllers';
import Route from '../interfaces/routes.interface';

class NotebookRoute implements Route {
  public router = Router();
  public path = '/notebook';
  public notebookController = new NotebookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getNotebooksByUserId/:id(\\d+)`, this.notebookController.getNotebooksByUserId);
    this.router.post(`${this.path}/createNotebook`, this.notebookController.createNotebook);
    this.router.put(`${this.path}/updateNotebook`, this.notebookController.updateNotebook);
    this.router.delete(`${this.path}/deleteNotebook/:id(\\d+)`, this.notebookController.deleteNotebook);
  }
}

export default NotebookRoute;
