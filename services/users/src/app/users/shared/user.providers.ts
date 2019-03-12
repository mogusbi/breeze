/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlEnum, User} from '@breezejs/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {UserEnum} from './user.enum';

export const UserProviders: Provider[] = [
  {
    inject: [
      SqlEnum.providerToken
    ],
    provide: UserEnum.providerToken,
    useFactory (connection: Connection): Repository<User> {
      return connection.getRepository(User);
    }
  }
];
