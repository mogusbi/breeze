import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiImplicitQuery, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Pagination, pagination, PaginationOptions} from 'shared/pagination';
import {ValidationPipe} from 'shared/validation';
import {swagger, swaggerWithType} from 'shared/swagger';
import {Role, RoleCreateDto, Roles, RoleUpdateDto} from './role.model';
import {RoleService} from './role.service';

@ApiUseTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get()
  @ApiImplicitQuery(pagination.limit)
  @ApiImplicitQuery(pagination.page)
  @ApiResponse(swagger.NO_CONTENT)
  @ApiResponse(swaggerWithType(swagger.OK, Roles)) // TODO: Pagination type
  public async httpGetAll (
    @Pagination() options: PaginationOptions
  ): Promise<Roles> {
    return this.roleService.readAll(options);
  }

  @Get(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swaggerWithType(swagger.OK, Role))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpGetOne (
    @Param('id') id: string
  ): Promise<Role> {
    return this.roleService.readOne(id);
  }

  @Post()
  @ApiResponse(swagger.BAD_REQUEST)
  @ApiResponse(swaggerWithType(swagger.CREATED, Role))
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPost (
    @Body(new ValidationPipe()) props: RoleCreateDto
  ): Promise<Role> {
    return this.roleService.create(props);
  }

  @Put(':id')
  @ApiResponse(swagger.BAD_REQUEST)
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swaggerWithType(swagger.OK, Role))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPut (
    @Param('id') id: string,
    @Body(new ValidationPipe()) props: RoleUpdateDto
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
