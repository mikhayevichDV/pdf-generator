import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { join } from 'path';

import { Config } from '@core/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const publicPath = join(__dirname, '..', '..', 'public');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // TODO make and use your own validation pipe
  app
    .useGlobalPipes(new ValidationPipe())
    .useStaticAssets(publicPath)
    // TODO setup cors for client url (use Config.get.clientURL)
    .enableCors({ origin: '*' });

  // Swagger
  const { url, title } = Config.get.swaggerOptions;
  const auth: SecuritySchemeObject = {
    name: 'Authorization',
    type: 'http',
    in: 'header',
    description: 'User token',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  };
  const config = new DocumentBuilder().setTitle(title).addBearerAuth(auth).build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(url, app, document);

  await app.listen(Config.get.port);
}

bootstrap();
