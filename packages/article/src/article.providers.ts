/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlEnum} from '@breezejs/sql';
import {Provider} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Article} from './article.entity';
import {ArticleEnum} from './article.enum';

export const ArticleProviders: Provider[] = [
  {
    inject: [
      SqlEnum.providerToken
    ],
    provide: ArticleEnum.providerToken,
    useFactory (connection: Connection): Repository<Article> {
      return connection.getRepository(Article);
    }
  }
];
