import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@entities/user';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async uploadImage(req: any, file: Express.Multer.File) {
    await this._userRepository.update(req.user.id, { image: file.path });
  }
}
