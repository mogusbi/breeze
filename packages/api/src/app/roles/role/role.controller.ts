import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {ObjectIdPipe} from 'shared/object-id';
import {swagger, swaggerWithType} from 'shared/swagger';
import {ValidationPipe} from 'shared/validation';
import {Role, RoleCreateDto, RoleService, RoleUpdateDto} from '../shared';

@ApiBearerAuth()
@ApiUseTags('Role')
@Controller('role')
export class RoleController {
  constructor (
    private readonly roleService: RoleService
  ) {}

  @Get(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swaggerWithType(swagger.OK, Role))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpGetOne (
    @Param('id', new ObjectIdPipe()) id: string
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
    @Param('id', new ObjectIdPipe()) id: string,
    @Body(new ValidationPipe()) props: RoleUpdateDto
  ): Promise<Role> {
    return this.roleService.update(id, props);
  }

  @Delete(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swagger.OK)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpDelete (
    @Param('id', new ObjectIdPipe()) id: string
  ): Promise<void> {
    await this.roleService.drop(id);
  }
}
