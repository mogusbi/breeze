/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlEnum} from '@breezejs/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Media} from './media.entity';
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
