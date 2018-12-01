/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {SeasonModule} from './season';
import {TeamModule} from './team';

/**
 * Predictor service app module
 */
@Module({
  imports: [
    SeasonModule,
    TeamModule
  ]
})
export class AppModule {}
