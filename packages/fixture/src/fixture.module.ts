/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breeze/sql';
import {Module} from '@nestjs/common';
import {FixtureProviders} from './fixture.providers';
import {FixtureService} from './fixture.service';

/**
 * Fixture module
 */
@Module({
  exports: [
    FixtureService
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...FixtureProviders,
    FixtureService
  ]
})
export class FixtureModule {}
