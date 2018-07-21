import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
// import {PaginateModel} from 'mongoose';
import {RolesController} from './roles.controller';
import {RoleService} from './shared';
// import {IRole} from './shared';

describe('Roles controller', () => {
  let controller: RolesController;
  let service: RoleService;

  beforeEach(async () => {
    const mod: TestingModule = await Test
      .createTestingModule({
        components: [
          // {
          //   provide: 'RoleSchemaModel',
          //   useValue: RoleSchema
          // },
          RoleService
        ],
        controllers: [
          RolesController
        ],
        imports: [
          {
            provide: 'RoleSchemaModel',
            useClass: null
          }
        ]
      })
      .compile();

    controller = mod.get<RolesController>(RolesController);
    service = mod.get<RoleService>(RoleService);
  });

  it('should all be true', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
