import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'dima.mikhayevich@mail.ru' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'defaultPass' })
  @IsNotEmpty()
  readonly password: string;
}
