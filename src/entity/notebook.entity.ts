import { IsNotEmpty } from 'class-validator';
import { BaseEntity, ChildEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity()
export class NotebookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(type => UserEntity, userEntity => userEntity.id)
  user: UserEntity;
}
