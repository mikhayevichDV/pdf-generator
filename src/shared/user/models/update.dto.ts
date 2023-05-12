import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Dzmitry' })
  readonly firstName: string;

  @ApiProperty({ example: 'Mikhayevich' })
  readonly lastName: string;

  @ApiProperty({ example: 'dima.mikhayevich@mail.ru' })
  readonly email: string;
}
