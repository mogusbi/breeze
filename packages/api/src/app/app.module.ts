import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionsModule} from 'app/permissions';
import {RolesModule} from 'app/roles';
import {UsersModule} from 'app/users';
import config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.connectionString),
    PermissionsModule,
    RolesModule,
    UsersModule
  ]
})
export class AppModule {}
