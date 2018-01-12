import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {RoleController} from './role.controller';
import {RoleSchema} from './role.schema';
import {RoleService} from './role.service';

@Module({
  components: [
    RoleService
  ],
  controllers: [
    RoleController
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
export class RoleModule {}
