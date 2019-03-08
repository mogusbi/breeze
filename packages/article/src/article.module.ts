/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breezejs/sql';
import {Module} from '@nestjs/common';
import {ArticleProviders} from './article.providers';
import {ArticleService} from './article.service';

/**
 * Article module
 */
@Module({
  exports: [
    ArticleService
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...ArticleProviders,
    ArticleService
  ]
})
export class ArticleModule {}
