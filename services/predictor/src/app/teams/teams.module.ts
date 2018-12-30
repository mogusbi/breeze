/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {TeamModule} from '@breeze/team';
import {Module} from '@nestjs/common';
import {TeamController} from './team';

/**
 * Teams module for predictor service
 */
@Module({
  controllers: [
    TeamController
  ],
  imports: [
    TeamModule
  ]
})
export class TeamsModule {}
