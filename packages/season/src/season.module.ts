/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breeze/sql';
import {Module} from '@nestjs/common';
import {SeasonProviders} from './season.providers';
import {SeasonService} from './season.service';

/**
 * Season module
 */
@Module({
  exports: [
    SeasonService
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...SeasonProviders,
    SeasonService
  ]
})
export class SeasonModule {}
