import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {RoleController} from './role';
import {RolesListController} from './roles-list';
import {RolesController} from './roles.controller';
import {RoleSchema, RoleService} from './shared';

@Module({
  components: [
    RoleService
  ],
  controllers: [
    RoleController,
    RolesController,
    RolesListController
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Role',
        schema: RoleSchema
      }
    ])
  ]
})
export class RolesModule {}
