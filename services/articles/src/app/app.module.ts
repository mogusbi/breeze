/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {ArticlesModule} from './articles';

/**
 * App module for articles service
 */
@Module({
  imports: [
    ArticlesModule
  ]
})
export class AppModule {}
