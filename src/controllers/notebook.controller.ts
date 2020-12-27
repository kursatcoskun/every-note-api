import { NextFunction, Request, Response } from 'express';
import { NotebookDto } from '../dtos/notebook.dto';
import { CreateUserDto } from '../dtos/users.dto';
import { NotebookEntity } from '../entity';
import { User } from '../interfaces/users.interface';
import { NotebookService } from '../services';
import { GenericResponse } from '../utils/genericResponse';

export class NotebookController {
  public notebookService = new NotebookService();

  public getNotebooksByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const notebooks: NotebookEntity[] = await this.notebookService.getNotebooksByUserId(userId);
      const genericResponse: GenericResponse<NotebookDto[]> = { data: notebooks, result: { resultType: 'SUCCESS' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };

  public createNotebook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notebookDto: NotebookDto = req.body;
      const createdNotebook: NotebookDto = await this.notebookService.createNotebook(notebookDto);
      const genericResponse: GenericResponse<NotebookDto> = { data: createdNotebook, result: { resultType: 'SUCCESS' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };
}

export default NotebookController;
