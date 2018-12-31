/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlEnum} from '@breeze/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Fixture} from './fixture.entity';
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
