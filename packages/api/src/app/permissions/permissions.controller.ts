import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Pagination, pagination, PaginationOptions} from 'shared/pagination';
import {swagger, swaggerWithType} from 'shared/swagger';
import {Permissions, PermissionService} from './shared';

@ApiBearerAuth()
@ApiUseTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor (
    private readonly permissionService: PermissionService
  ) {}

  @Get()
  @ApiImplicitQuery(pagination.limit)
  @ApiImplicitQuery(pagination.page)
  @ApiResponse(swagger.NO_CONTENT)
  @ApiResponse(swaggerWithType(swagger.OK, Permissions))
  public async httpGetAll (
    @Pagination() options: PaginationOptions
  ): Promise<Permissions> {
    return this.permissionService.readAll(options);
  }
}
