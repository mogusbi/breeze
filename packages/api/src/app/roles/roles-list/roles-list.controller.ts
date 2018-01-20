import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {swagger, swaggerWithType} from 'shared/swagger';
import {Role, RoleService} from '../shared';

@ApiBearerAuth()
@ApiUseTags('List', 'Role')
@Controller('roles/list')
export class RolesListController {
  constructor (
    private roleService: RoleService
  ) {}

  @Get()
  @ApiResponse(swagger.NO_CONTENT)
  @ApiResponse(swaggerWithType(swagger.OK, Role, true))
  public async httpGetAll (): Promise<Role[]> {
    return await this.roleService.readList();
  }
}
