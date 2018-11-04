import {DynamoModule} from '@breeze-bb/core';
import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';

@Module({
  controllers: [
    UserController
  ],
  imports: [
    DynamoModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}
