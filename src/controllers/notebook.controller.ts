import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { NotebookEntity } from '../entity';
import { User } from '../interfaces/users.interface';
import { NotebookService } from '../services';

export class NotebookController {
  public userService = new NotebookService();

  public getNotebooksByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const notebooks: NotebookEntity[] = await this.userService.getNotebooksByUserId(userId);

      res.status(200).json({ data: notebooks, message: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  };
}

export default NotebookController;
