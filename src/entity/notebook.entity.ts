import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity()
export class NotebookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, userEntity => userEntity, { nullable: false })
  user: UserEntity;

  @Column()
  public userId: number;
}
