/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {ArticleModule} from '@breezejs/article';
import {Module} from '@nestjs/common';
import {ArticleController} from './article';

/**
 * Articles module for predictor service
 */
@Module({
  controllers: [
    ArticleController
  ],
  imports: [
    ArticleModule
  ]
})
export class ArticlesModule {}
