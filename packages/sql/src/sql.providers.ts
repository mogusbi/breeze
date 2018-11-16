/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Provider} from '@nestjs/common';
import {Connection, ConnectionOptions, ConnectionOptionsReader, getConnectionManager} from 'typeorm';
import {SqlEnum} from './sql.enum';

export const SqlProviders: Provider[] = [
  {
    provide: SqlEnum.providerToken,
    async useFactory (): Promise<Connection> {
      const root: string = process.cwd();
      const options: ConnectionOptions = await new ConnectionOptionsReader({
        root
      }).get('default');

      return getConnectionManager().create(options).connect();
    }
  }
];
