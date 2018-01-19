import {MongooseModule} from '@nestjs/mongoose';
import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {RolesController} from './roles.controller';
import {RoleSchema, RoleService} from './shared';

describe('Roles controller', () => {
  let controller: RolesController;
  let service: RoleService;

  beforeEach(async () => {
    const mod: TestingModule = await Test
      .createTestingModule({
        components: [
          RoleService
        ],
        controllers: [
          RolesController
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
      .compile();

    controller = mod.get<RolesController>(RolesController);
    service = mod.get<RoleService>(RoleService);
  });

  it('should be true', () => {
    console.log(controller, service);
    expect(true).toBe(true);
  });
});
