/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breezejs/sql';
import {Module} from '@nestjs/common';
import {CompetitionProviders} from './competition.providers';
import {CompetitionService} from './competition.service';

/**
 * Competition module
 */
@Module({
  exports: [
    CompetitionService
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
