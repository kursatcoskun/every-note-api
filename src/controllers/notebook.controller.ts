import { NextFunction, Request, Response } from 'express';
import { NotebookDto } from '../dtos/notebook.dto';
import { NotebookEntity } from '../entity';
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

  public updateNotebook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notebookDto: NotebookDto = req.body;
      const updatedNotebook: NotebookDto = await this.notebookService.updateNotebook(notebookDto);
      const genericResponse: GenericResponse<NotebookDto> = { data: updatedNotebook, result: { resultType: 'SUCCESS' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };

  public deleteNotebook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notebookId = req.params.id;
      const isDeleted = await this.notebookService.deleteNotebook(Number(notebookId));
      const genericResponse: GenericResponse<null> = { data: null, result: { resultType: isDeleted ? 'SUCCESS' : 'ERROR' } };
      res.status(200).json(genericResponse);
    } catch (error) {
      next(error);
    }
  };
}

export default NotebookController;
