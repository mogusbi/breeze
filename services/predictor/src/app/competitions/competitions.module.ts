/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {CompetitionModule} from '@breeze/competition';
import {Module} from '@nestjs/common';
import {CompetitionController} from './competition';

/**
 * Competitions module for predictor service
 */
@Module({
  controllers: [
    CompetitionController
  ],
  imports: [
    CompetitionModule
  ]
})
export class CompetitionsModule {}
