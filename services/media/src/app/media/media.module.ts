/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breezejs/sql';
import {Module} from '@nestjs/common';
import {MediaProviders} from './media.providers';
import {MediaService} from './media.service';

/**
 * Media module
 */
@Module({
  exports: [
    MediaService
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...MediaProviders,
    MediaService
  ]
})
export class MediaModule {}
