/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {SqlModule} from '@breezejs/sql';
import {Module} from '@nestjs/common';
import {UserProviders, UserService} from './shared';
import {UserController} from './user';

/**
 * Users module
 */
@Module({
  controllers: [
    UserController
  ],
  imports: [
    SqlModule
  ],
  providers: [
    ...UserProviders,
    UserService
  ]
})
export class UsersModule {}
