// tslint:disable no-require-imports
import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {SwaggerBaseConfig, SwaggerDocument} from '@nestjs/swagger/interfaces';
import {AppModule} from 'app';
import {json} from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap (): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const prefix: string = '/api/1.0';
  const port: number = parseInt(process.env.PORT, 10) || 8080;
  const {description, version} = require('../../../package.json');

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(json());
  app.setGlobalPrefix(prefix);

  const options: SwaggerBaseConfig = new DocumentBuilder()
    .setTitle('Breeze BB')
    .setDescription(description)
    .setBasePath(prefix)
    .setVersion(version)
    .build();

  const document: SwaggerDocument = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
}

bootstrap();
