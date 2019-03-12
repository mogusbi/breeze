/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Media, SqlEnum} from '@breezejs/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {MediaEnum} from './media.enum';

export const MediaProviders: Provider[] = [
  {
    inject: [
      SqlEnum.providerToken
    ],
    provide: MediaEnum.providerToken,
    useFactory (connection: Connection): Repository<Media> {
      return connection.getRepository(Media);
    }
  }
];
