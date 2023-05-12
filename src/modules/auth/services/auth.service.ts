import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Config } from '@core/config';
import { UserEntity } from '@entities/user';
import { UserService } from '@shared/user/services';

import { ApiAuthResponseModel, LoginUserDto } from '../models';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly _authRepository: Repository<UserEntity>,
    private readonly _userService: UserService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<ApiAuthResponseModel> {
    const user = await this._authRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.password'])
      .where('user.email = :email', { email: loginUserDto.email })
      .getOne();

    if (!user) {
      throw new UnprocessableEntityException(`User doesn't exist`);
    }

    const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnprocessableEntityException(`Check your password`);
    }

    delete user.password;

    return this._buildUserResponse(user);
  }

  async recoverPassword(email: string, newPassword: string) {
    const password = await bcrypt.hash(newPassword, Config.get.hashSalt);

    await this._authRepository.update({ email }, { password });
  }

  private _generateJwt(user: any): string {
    const payload = { user };

    return this._jwtService.sign(payload, {
      secret: Config.get.hashKeyForJwtToken,
      expiresIn: '24h',
    });
  }

  private _buildUserResponse(user: any): ApiAuthResponseModel {
    return {
      token: this._generateJwt(user),
    };
  }
}
