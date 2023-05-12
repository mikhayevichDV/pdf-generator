import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ example: 'dima.mikhayevich@mail.ru' })
  readonly email: string;
}
