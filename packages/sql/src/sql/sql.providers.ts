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
      const connection: string = process.env.NODE_ENV === 'test' ? SqlEnum.testConnection : SqlEnum.defaultConnection;
      const root: string = process.cwd();
      const options: ConnectionOptions = await new ConnectionOptionsReader({
        root
      }).get(connection);

      return getConnectionManager().create(options).connect();
    }
  }
];
