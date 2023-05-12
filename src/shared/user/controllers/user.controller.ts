import { Body, Delete, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserEntity } from '@entities/user';

import { AuthenticatedUser, IsAuthenticated, UserController as Controller } from '../decorators';
import { DeleteUserDto, UpdateUserDto } from '../models';
import { UserService } from '../services';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @IsAuthenticated()
  @Patch('update')
  updateProfile(@AuthenticatedUser() req: any, @Body() { firstName, lastName, email }: UpdateUserDto): Promise<void> {
    return this._userService.update(req, { firstName, lastName, email });
  }

  @IsAuthenticated()
  @Get('users')
  async getAllUsers(): Promise<UserEntity[]> {
    return this._userService.getAllUsers();
  }

  @IsAuthenticated()
  @Delete('/')
  async deleteUser(@Body() { email }: DeleteUserDto): Promise<void> {
    return this._userService.delete({ email });
  }
}
