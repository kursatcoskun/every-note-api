import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  cDate: Date;

  @UpdateDateColumn()
  uDate: Date;

  @Column()
  status: boolean;
}
