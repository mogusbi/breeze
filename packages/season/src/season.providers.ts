/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Season, SqlEnum} from '@breezejs/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {SeasonEnum} from './season.enum';

export const SeasonProviders: Provider[] = [
  {
    inject: [
      SqlEnum.providerToken
    ],
    provide: SeasonEnum.providerToken,
    useFactory (connection: Connection): Repository<Season> {
      return connection.getRepository(Season);
    }
  }
];
