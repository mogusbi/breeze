import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema, UserService} from './shared';
import {UserController} from './user';

@Module({
  components: [
    UserService
  ],
  controllers: [
    UserController
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ]
})
export class UsersModule {}
