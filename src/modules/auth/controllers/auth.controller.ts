import { Body, Get, HttpStatus, Patch, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { IsAuthenticated } from '@shared/user/decorators';
import { UserService } from '@shared/user/services';

import { AuthControllerDecorator as Controller } from '../decorators';
import { ApiAuthResponseModel, LoginUserDto } from '../models';
import { AuthService } from '../services';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly _authService: AuthService, private readonly _userService: UserService) {}

  @ApiResponse({ type: ApiAuthResponseModel })
  @Post('user/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<ApiAuthResponseModel> {
    return this._authService.login(loginUserDto);
  }

  @Patch('recover')
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  async update(@Body() { email, password }: LoginUserDto): Promise<void> {
    return this._authService.recoverPassword(email, password);
  }

  @IsAuthenticated()
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
