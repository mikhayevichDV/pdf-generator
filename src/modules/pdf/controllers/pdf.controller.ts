import { Body, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PdfControllerDecorator as Controller } from '../decorators';
import { GeneratePdfDto } from '../models';
import { PdfService } from '../services';

@Controller()
@ApiTags('PDF')
export class PdfController {
  constructor(private readonly _pdfService: PdfService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  @Post('generate')
  generatePdf(@Body() { email }: GeneratePdfDto): Promise<any> {
    return this._pdfService.generatePdf(email);
  }
}
