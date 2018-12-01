/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlEnum} from '@breeze/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Competition} from './competition.entity';
import {CompetitionEnum} from './competition.enum';

export const CompetitionProviders: Provider[] = [
  {
    inject: [
      SqlEnum.providerToken
    ],
    provide: CompetitionEnum.providerToken,
    useFactory (connection: Connection): Repository<Competition> {
      return connection.getRepository(Competition);
    }
  }
];
