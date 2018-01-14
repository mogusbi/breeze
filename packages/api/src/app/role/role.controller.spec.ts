import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {RoleController} from './role.controller';
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
