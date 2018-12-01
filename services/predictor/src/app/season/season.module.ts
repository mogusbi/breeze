/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breeze/sql';
import {Module} from '@nestjs/common';
import {SeasonController} from './season.controller';
import {SeasonProviders} from './season.providers';
import {SeasonService} from './season.service';

/**
 * Season module for predictor service
 */
@Module({
  controllers: [
    SeasonController
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
