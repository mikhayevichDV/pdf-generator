import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Dzmitry' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Mikhayevich' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Mikhayevich@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'defaultPass' })
  password: string;
}
