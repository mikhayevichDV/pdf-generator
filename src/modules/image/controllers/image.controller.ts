import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';

import { AuthenticatedUser, IsAuthenticated } from '@shared/user/decorators';

import { ImageControllerDecorator as Controller } from '../decorators';
import { ImageService } from '../services';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller()
@ApiTags('Image')
export class ImageController {
  constructor(private readonly _imageService: ImageService) {}

  @IsAuthenticated()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req: any, file: Express.Multer.File, callback: (error: Error, filename: string) => void): any => {
          const filename: string = uuidv4();
          const extension: string = path.parse(file.originalname).ext;

          callback(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadImage(
    @AuthenticatedUser() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this._imageService.uploadImage(req, file);
  }
}
