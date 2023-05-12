import { OmitType } from '@nestjs/swagger';

import { LoginUserDto } from '@modules/auth/models/login.dto';

export class RecoverPasswordDto extends OmitType(LoginUserDto, ['email']) {}
