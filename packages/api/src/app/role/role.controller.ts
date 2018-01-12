import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {RoleDto} from './role.dto';
import {IRole} from './role.interface';
import {RoleService} from './role.service';

@ApiUseTags('Role')
@Controller('role')
export class RoleController {
  constructor (
    private readonly roleService: RoleService
  ) {}

  @Get()
  public async httpGet (): Promise<IRole[]> {
    const docs: IRole[] = await this.roleService.readAll();

    console.log(docs);
    return docs;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.'
  })
  public async httpPost (
    @Body() props: RoleDto
  ): Promise<void> {
    this.roleService.create(props);
  }
}
