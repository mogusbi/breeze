/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breeze-bb/sql';
import {Module} from '@nestjs/common';
import {TeamController} from './team.controller';
import {TeamProviders} from './team.providers';
import {TeamService} from './team.service';

/**
 * Team module for predictor service
 */
@Module({
  controllers: [
    TeamController
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...TeamProviders,
    TeamService
  ]
})
export class TeamModule {}
