import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionsModule} from 'app/permissions';
import {RolesModule} from 'app/roles';
import config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.connectionString),
    PermissionsModule,
    RolesModule
  ]
})
export class AppModule {}
