/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breeze/sql';
import {Module} from '@nestjs/common';
import {CompetitionController} from './competition.controller';
import {CompetitionProviders} from './competition.providers';
import {CompetitionService} from './competition.service';

/**
 * Competition module for predictor service
 */
@Module({
  controllers: [
    CompetitionController
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...CompetitionProviders,
    CompetitionService
  ]
})
export class CompetitionModule {}
