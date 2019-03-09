/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breezejs/sql';
import {Module} from '@nestjs/common';
import {MediaController} from './media.controller';
import {MediaProviders} from './media.providers';
import {MediaService} from './media.service';

/**
 * Media module
 */
@Module({
  controllers: [
    MediaController
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
