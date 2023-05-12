import { Injectable } from '@nestjs/common';

import { UserDto } from '@shared/user/models';
import { UserService } from '@shared/user/services';

@Injectable()
export class RegisterService {
  constructor(private _registerRepository: UserService) {}

  async createUser(user: UserDto) {
    return this._registerRepository.create(user);
  }
}
