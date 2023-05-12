import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AwareId } from './aware-id';

export class BaseEntity extends AwareId {
  @CreateDateColumn({
    type: 'timestamp',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
  })
  updatedAt: Date;
}
