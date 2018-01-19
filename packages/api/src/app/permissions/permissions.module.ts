import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionController} from './permission';
import {PermissionsListController} from './permissions-list';
import {PermissionsController} from './permissions.controller';
import {PermissionSchema, PermissionService} from './shared';

@Module({
  components: [
    PermissionService
  ],
  controllers: [
    PermissionController,
    PermissionsController,
    PermissionsListController
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Permission',
        schema: PermissionSchema
      }
    ])
  ]
})
export class PermissionsModule {}
