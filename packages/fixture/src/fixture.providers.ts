/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Fixture, SqlEnum} from '@breezejs/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {FixtureEnum} from './fixture.enum';

export const FixtureProviders: Provider[] = [
  {
    inject: [
      SqlEnum.providerToken
    ],
    provide: FixtureEnum.providerToken,
    useFactory (connection: Connection): Repository<Fixture> {
      return connection.getRepository(Fixture);
    }
  }
];
