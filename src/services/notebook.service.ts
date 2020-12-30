import { classToPlain, plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { NotebookDto } from '../dtos/notebook.dto';
import { NotebookEntity, UserEntity } from '../entity';
import HttpException from '../exceptions/HttpException';

export class NotebookService {
  public notebookEntity = NotebookEntity;
  public userEntity = UserEntity;

  public async getNotebooksByUserId(userId: number): Promise<NotebookEntity[]> {
    const notebookRepository = getRepository(this.notebookEntity);
    const notebooks = await notebookRepository.find({ where: { user: { id: userId } } });
    return notebooks;
  }

  public async createNotebook(notebookDto: NotebookDto): Promise<NotebookDto> {
    const notebookEntity: NotebookEntity = plainToClass(NotebookEntity, notebookDto);
    const userRepository = getRepository(this.userEntity);
    const user = await userRepository.findOne({ where: { id: notebookDto.userId } });
    const notebookRepository = getRepository(this.notebookEntity);
    console.log(notebookEntity);
    const createdNotebook = await notebookRepository.save({ ...notebookEntity, user });
    console.log(createdNotebook);
    if (!createdNotebook) throw new HttpException(500, 'Notebook can not created.');
    return plainToClass(NotebookDto, createdNotebook);
  }

  public async updateNotebook(notebookDto: NotebookDto): Promise<NotebookDto> {
    const notebookEntity = plainToClass(NotebookEntity, notebookDto);
    const notebookRepository = getRepository(this.notebookEntity);
    const updatedNotebook = await notebookRepository.update(notebookEntity.id, notebookEntity);
    if (!updatedNotebook) throw new HttpException(500, 'Notebook can not updated.');
    return plainToClass(NotebookDto, updatedNotebook);
  }

  public async deleteNotebook(notebookId: number): Promise<any> {
    const notebookRepository = getRepository(this.notebookEntity);
    const notebookEntity = await notebookRepository.findOne({ where: { id: notebookId } });
    if (!notebookEntity) throw new HttpException(404, 'Notebook can not be found. Notebook ID: ' + notebookId);

    const deleted = await notebookRepository.delete({ id: notebookId });

    return !!deleted;
  }
}

export default NotebookService;
