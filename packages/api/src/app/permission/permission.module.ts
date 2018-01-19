import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionController} from './permission.controller';
import {PermissionSchema} from './permission.schema';
import {PermissionService} from './permission.service';

@Module({
  components: [
    PermissionService
  ],
  controllers: [
    PermissionController
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
export class PermissionModule {}
