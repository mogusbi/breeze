/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {MediaModule} from './media';

/**
 * App module for media service
 */
@Module({
  imports: [
    MediaModule
  ]
})
export class AppModule {}
