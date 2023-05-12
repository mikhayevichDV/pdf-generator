import { Body, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterService } from '@modules/register/services';
import { UserDto } from '@shared/user/models';

import { RegisterController as Controller } from '../decorators';

@Controller()
@ApiTags('Registration')
export class RegisterController {
  constructor(private _registerService: RegisterService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async register(@Body() user: UserDto) {
    return this._registerService.createUser(user);
  }
}
