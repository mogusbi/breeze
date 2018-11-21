/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {NestFactory} from '@nestjs/core';
import {bootstrap} from './bootstrap';

describe('bootstrap', (): void => {
  let appModule: object;
  let port: number;

  beforeEach((): void => {
    appModule = {
      dummyData: true
    };
    port = 5000;

    NestFactory.create = jest.fn().mockResolvedValue({
      listen: jest.fn(),
      use: jest.fn(),
      useGlobalPipes: jest.fn()
    });
  });

  it('should create an application if port is set', async (): Promise<void> => {
    await bootstrap(appModule, port);

    expect(NestFactory.create).toHaveBeenCalledWith({
      dummyData: true
    });
  });

  it('should create an application if no port is set', async (): Promise<void> => {
    await bootstrap(appModule);

    expect(NestFactory.create).toHaveBeenCalledWith({
      dummyData: true
    });
  });
});
