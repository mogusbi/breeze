import {Controller, Get} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {swagger, swaggerWithType} from 'shared/swagger';
import {Permission, PermissionService} from '../shared';

@ApiUseTags('List', 'Permission')
@Controller('permissions/list')
export class PermissionsListController {
  constructor (
    private readonly permissionService: PermissionService
  ) {}

  @Get()
  @ApiResponse(swagger.NO_CONTENT)
  @ApiResponse(swaggerWithType(swagger.OK, Permission, true))
  public async httpGetAll (): Promise<Permission[]> {
    return await this.permissionService.readList();
  }
}
