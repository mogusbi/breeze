import {MongooseModule} from '@nestjs/mongoose';
import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {RoleController} from './role.controller';
import {RoleSchema} from './role.schema';
import {RoleService} from './role.service';

describe('Role controller', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const mod: TestingModule = await Test
      .createTestingModule({
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
      .compile();

    controller = mod.get<RoleController>(RoleController);
    service = mod.get<RoleService>(RoleService);
  });

  it('should be true', () => {
    expect(true).toBe(true);
  });
});
