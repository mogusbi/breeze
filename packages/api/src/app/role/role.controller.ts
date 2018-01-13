import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiImplicitQuery, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {swagger, swaggerWithType} from 'constants/swagger';
import {Pagination, pagination, PaginationOptions} from 'shared/pagination';
import {RoleDto} from './role.dto';
import {Role, Roles} from './role.model';
import {RoleService} from './role.service';

@ApiUseTags('Role')
@Controller('role')
export class RoleController {
  constructor (
    private readonly roleService: RoleService
  ) {}

  @Get()
  @ApiImplicitQuery(pagination.limit)
  @ApiImplicitQuery(pagination.page)
  @ApiResponse(swagger.NOCONTENT)
  @ApiResponse(swaggerWithType(swagger.OK, Roles)) // TODO: Pagination type
  public async httpGetAll (
    @Pagination() pagination: PaginationOptions
  ): Promise<Roles> {
    return this.roleService.readAll(pagination);
  }

  @Get(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOTFOUND)
  @ApiResponse(swaggerWithType(swagger.OK, Role))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpGetOne (
    @Param('id') id: string
  ): Promise<Role> {
    return this.roleService.readOne(id);
  }

  @Post()
  @ApiResponse(swagger.CREATED)
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPost (
    @Body() props: RoleDto
  ): Promise<Role> {
    return this.roleService.create(props);
  }

  @Put(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swaggerWithType(swagger.OK, Role))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPut (
    @Param('id') id: string,
    @Body() props: RoleDto
  ): Promise<Role> {
    return this.roleService.update(id, props);
  }

  @Delete(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.OK)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpDelete (
    @Param('id') id: string
  ): Promise<void> {
    await this.roleService.drop(id);
  }
}
