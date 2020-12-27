import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { NotebookController } from '../controllers';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

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
  }
}

export default NotebookRoute;