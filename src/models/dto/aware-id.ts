import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AwareIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4', { message: 'Entity ID is invalid' })
  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb1d' }) // TODO: remove it in future (swagger actualizing with common fix for Max)
  id: string;
}

export class AwareIdOptionalDto {
  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'Entity ID is invalid' })
  @ApiPropertyOptional({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb1d' }) // TODO: remove it in future (swagger actualizing with common fix for Max)
  id?: string;
}
