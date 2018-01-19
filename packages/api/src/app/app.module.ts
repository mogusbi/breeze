import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionsModule} from 'app/permissions';
import {RoleModule} from 'app/role';
import config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.connectionString),
    PermissionsModule,
    RoleModule
  ]
})
export class AppModule {}
