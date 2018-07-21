import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {ObjectIdPipe} from 'shared/object-id';
import {swagger, swaggerWithType} from 'shared/swagger';
import {ValidationPipe} from 'shared/validation';
import {User, UserCreateDto, UserService} from '../shared';

@ApiBearerAuth()
@ApiUseTags('User')
@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Get(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swaggerWithType(swagger.OK, User))
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpGetOne (
    @Param('id', new ObjectIdPipe()) id: string
  ): Promise<User> {
    return this.userService.readOne(id);
  }

  @Post()
  @ApiResponse(swagger.BAD_REQUEST)
  @ApiResponse(swaggerWithType(swagger.CREATED, User))
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpPost (
    @Body(new ValidationPipe()) props: UserCreateDto
  ): Promise<User> {
    return this.userService.create(props);
  }

  // TODO: Edit

  @Delete(':id')
  @ApiResponse(swagger.FORBIDDEN)
  @ApiResponse(swagger.NOT_FOUND)
  @ApiResponse(swagger.OK)
  @ApiResponse(swagger.UNAUTHORISED)
  public async httpDelete (
    @Param('id', new ObjectIdPipe()) id: string
  ): Promise<void> {
    await this.userService.drop(id);
  }
}
