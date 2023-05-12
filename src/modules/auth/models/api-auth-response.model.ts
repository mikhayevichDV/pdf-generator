import { ApiProperty } from '@nestjs/swagger';

export class ApiAuthResponseModel {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNtaXJub3ZhQGdtYWlsLmNvbSIsImlhdCI6MTY3OTY2MDQzOSwiZXhwIjoxNjc5NjYwNDk5fQ.3CHr-Vu4ZBx93QkxGzP7kG_STPnyKGLuLvFRvkmv37I',
  })
  token: string;
}
