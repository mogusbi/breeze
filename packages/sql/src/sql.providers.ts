/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Provider} from '@nestjs/common';
import {Connection, createConnection} from 'typeorm';
import {SqlEnum} from './sql.enum';

export const SqlProviders: Provider[] = [
  {
    provide: SqlEnum.providerToken,
    async useFactory (): Promise<Connection> {
      return createConnection();
    }
  }
];
