import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {ObjectIdPipe} from 'shared/object-id';
import {swagger, swaggerWithType} from 'shared/swagger';
import {ValidationPipe} from 'shared/validation';
import {Permission, PermissionCreateDto, PermissionService, PermissionUpdateDto} from '../shared';

@ApiUseTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor (
    private readonly permissionService: PermissionService
  ) {}

  @Get(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swaggerWithType(swagger.OK, Permission))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpGetOne (
    @Param('id', new ObjectIdPipe()) id: string
  ): Promise<Permission> {
    return this.permissionService.readOne(id);
  }

  @Post()
  @ApiResponse(swagger.BAD_REQUEST)
  @ApiResponse(swaggerWithType(swagger.CREATED, Permission))
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPost (
    @Body(new ValidationPipe()) props: PermissionCreateDto
  ): Promise<Permission> {
    return this.permissionService.create(props);
  }

  @Put(':id')
  @ApiResponse(swagger.BAD_REQUEST)
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swaggerWithType(swagger.OK, Permission))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPut (
    @Param( 'id', new ObjectIdPipe()) id: string,
    @Body(new ValidationPipe()) props: PermissionUpdateDto
  ): Promise<Permission> {
    return this.permissionService.update(id, props);
  }

  @Delete(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swagger.OK)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpDelete (
    @Param('id', new ObjectIdPipe()) id: string
  ): Promise<void> {
    await this.permissionService.drop(id);
  }
}
