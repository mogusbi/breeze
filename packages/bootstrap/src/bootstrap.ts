/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as mogan from 'morgan';

/**
 * Bootstraps an application module
 *
 * @param appModule - The application module to be bootstrapped
 * @param port - The port to launch the bootstrapped module
 */
export async function bootstrap (appModule: object, port: number = 3000): Promise<void> {
  const app: INestApplication = await NestFactory.create(appModule);

  app.use(mogan('dev'));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
