/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breezejs/sql';
import {Module} from '@nestjs/common';
import {ArticleController} from './article';
import {ArticleProviders, ArticleService} from './shared';

/**
 * Articles module
 */
@Module({
  controllers: [
    ArticleController
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...ArticleProviders,
    ArticleService
  ]
})
export class ArticlesModule {}
