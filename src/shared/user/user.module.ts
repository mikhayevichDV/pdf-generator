import { DynamicModule } from '@nestjs/common';

import { UserController } from './controllers';
import { USERS_SERVICES } from './services';
import { JwtStrategy } from './strategies';

export class UserModule {
  static forRoot(): DynamicModule {
    const providers = [...USERS_SERVICES, JwtStrategy];

    return {
      controllers: [UserController],
      module: UserModule,
      providers,
      exports: providers,
    };
  }
}
