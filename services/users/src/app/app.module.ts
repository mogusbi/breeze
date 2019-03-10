/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {UsersModule} from './users';

/**
 * App module for users service
 */
@Module({
  imports: [
    UsersModule
  ]
})
export class AppModule {}
