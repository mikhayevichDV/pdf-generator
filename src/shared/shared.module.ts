import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '@core/config';

import { UserModule } from './user';
import { ENTITIES } from '@entities/index';

@Global()
@Module({})
export class SharedModule {
  static share(): DynamicModule {
    const sharedModules = [
      TypeOrmModule.forRoot(Config.get.typeORMOptions),
      TypeOrmModule.forFeature(ENTITIES),
      JwtModule.register({ secret: Config.get.hashKeyForJwtToken }),
      UserModule.forRoot(),
    ];

    return {
      module: SharedModule,
      imports: sharedModules,
      exports: sharedModules,
    };
  }
}
