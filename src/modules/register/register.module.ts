import { Module } from '@nestjs/common';

import { RegisterController } from './controllers';
import { RegisterService } from './services';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
