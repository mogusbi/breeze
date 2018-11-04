import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

export async function bootstrap (appModule: object, port: number = 3000): Promise<void> {
  const app: INestApplication = await NestFactory.create(appModule);

  await app.listen(port);
}
