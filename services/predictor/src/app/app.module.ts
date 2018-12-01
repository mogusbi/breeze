/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {CompetitionModule} from './competition';
import {SeasonModule} from './season';
import {TeamModule} from './team';

/**
 * Predictor service app module
 */
@Module({
  imports: [
    CompetitionModule,
    SeasonModule,
    TeamModule
  ]
})
export class AppModule {}
