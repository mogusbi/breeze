import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {RoleModule} from 'app/role';
import config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.connectionString),
    RoleModule
  ]
})
export class AppModule {}
