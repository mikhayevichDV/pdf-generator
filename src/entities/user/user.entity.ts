import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@entities/common';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'firstName' })
  firstName: string;

  @Column({ type: 'varchar', name: 'lastName' })
  lastName: string;

  @Column({ type: 'varchar', name: 'image', default: null })
  image: string;

  @Column({ type: 'varchar', name: 'password', select: false })
  password: string;

  @Column({ type: 'blob', name: 'pdf' })
  pdf: string;
}
