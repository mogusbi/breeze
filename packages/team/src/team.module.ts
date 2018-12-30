/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breeze/sql';
import {Module} from '@nestjs/common';
import {TeamProviders} from './team.providers';
import {TeamService} from './team.service';

/**
 * Team module
 */
@Module({
  exports: [
    TeamService
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
