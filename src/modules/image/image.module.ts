import { Module } from '@nestjs/common';

import { ImageController } from './controllers';
import { ImageService } from './services';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
