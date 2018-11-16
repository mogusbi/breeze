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
      listen: jest.fn()
    });
  });

  it('should throw an error if no port is set', async (): Promise<void> => {
    await expect(bootstrap(appModule, null)).rejects.toThrowError('No port has been set');
  });

  it('should create an application', async (): Promise<void> => {
    await bootstrap(appModule, port);

    expect(NestFactory.create).toHaveBeenCalledWith({
      dummyData: true
    });
  });
});
