/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

/**
 * Bootstraps an application module
 *
 * @param appModule - The application module to be bootstrapped
 * @param port - The port to launch the bootstrapped module
 */
export async function bootstrap (appModule: object, port: number): Promise<void> {
  if (!port) {
    throw new Error('No port has been set');
  }

  const app: INestApplication = await NestFactory.create(appModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
