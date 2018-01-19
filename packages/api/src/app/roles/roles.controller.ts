import {Controller, Get} from '@nestjs/common';
import {ApiImplicitQuery, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Pagination, pagination, PaginationOptions} from 'shared/pagination';
import {swagger, swaggerWithType} from 'shared/swagger';
import {Roles, RoleService} from './shared';

@ApiUseTags('Role')
@Controller('roles')
export class RolesController {
  constructor (
    private readonly roleService: RoleService
  ) {}

  @Get()
  @ApiImplicitQuery(pagination.limit)
  @ApiImplicitQuery(pagination.page)
  @ApiResponse(swagger.NO_CONTENT)
  @ApiResponse(swaggerWithType(swagger.OK, Roles))
  public async httpGetAll (
    @Pagination() options: PaginationOptions
  ): Promise<Roles> {
    return this.roleService.readAll(options);
  }
}
