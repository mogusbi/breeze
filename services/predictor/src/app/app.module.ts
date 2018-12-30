/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {CompetitionsModule} from './competitions';
import {SeasonsModule} from './seasons';
import {TeamsModule} from './teams';

/**
 * Predictor service app module
 */
@Module({
  imports: [
    CompetitionsModule,
    SeasonsModule,
    TeamsModule
  ]
})
export class AppModule {}
