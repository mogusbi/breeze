import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionModule} from 'app/permission';
import {RoleModule} from 'app/role';
import config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.connectionString),
    PermissionModule,
    RoleModule
  ]
})
export class AppModule {}
