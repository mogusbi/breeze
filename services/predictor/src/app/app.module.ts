/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {TeamModule} from './team';

/**
 * Predictor service app module
 */
@Module({
  imports: [
    TeamModule
  ]
})
export class AppModule {}
