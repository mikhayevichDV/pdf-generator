import { PrimaryGeneratedColumn } from 'typeorm';

export class AwareId {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
