/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FixtureModule} from '@breeze/fixture';
import {Module} from '@nestjs/common';
import {FixtureController} from './fixture';

/**
 * Fixtures module for predictor service
 */
@Module({
  controllers: [
    FixtureController
  ],
  imports: [
    FixtureModule
  ]
})
export class FixturesModule {}
