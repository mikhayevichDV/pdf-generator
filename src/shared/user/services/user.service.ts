import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Config } from '@core/config';
import { UserEntity } from '@entities/user';

import { DeleteUserDto, UpdateUserDto, UserDto } from '../models';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async create({ firstName, lastName, password: plainPassword, email }: UserDto) {
    try {
      const password = await bcrypt.hash(plainPassword, Config.get.hashSalt);

      const user = await this._userRepository.create({ firstName, lastName, email, password });

      await this._userRepository.save(user);

      delete user.password;

      return user;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  async update(req: any, { ...updateData }: UpdateUserDto) {
    await this._userRepository.update(req.user.id, { ...updateData });
  }

  async delete({ email }: DeleteUserDto) {
    await this._userRepository.delete({ email });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this._userRepository.find({
      order: {
        createdAt: 'asc',
      },
    });
  }

  async findByEmail(email: string) {
    return this._userRepository.findOneBy({ email });
  }

  async _getUserById(inputId: string): Promise<UserEntity> {
    return this._userRepository.createQueryBuilder('user').where('user.id = :id', { id: inputId }).getOne();
  }
}
