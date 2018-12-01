/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlEnum} from '@breeze/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Season} from './season.entity';
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
