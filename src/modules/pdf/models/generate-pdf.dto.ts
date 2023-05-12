import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GeneratePdfDto {
  @ApiProperty({ example: 'dima.mikhayevich@mail.ru' })
  @IsNotEmpty()
  readonly email: string;
}
