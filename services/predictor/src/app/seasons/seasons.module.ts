/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SeasonModule} from '@breezejs/season';
import {Module} from '@nestjs/common';
import {SeasonController} from './season';

/**
 * Seasons module for predictor service
 */
@Module({
  controllers: [
    SeasonController
  ],
  imports: [
    SeasonModule
  ]
})
export class SeasonsModule {}
