/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breezejs/request';
import {User} from '@breezejs/sql';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {UserDto, UserService} from '../shared';

/**
 * Controller for /users endpoints
 */
@Controller('users')
export class UserController {
  /**
   * @param userService - User service
   */
  constructor (
    private readonly userService: UserService
  ) {}

  /**
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - User data transfer object
   *
   * @return User entity
   */
  private static createUser (dto: UserDto): User {
    return Object.assign(new User(), dto);
  }

  /**
   * [Post] Creates a new user
   *
   * @param dto - User data transfer object
   *
   * @returns Newly created user entity
   */
  @Post()
  public async create (
    @Body() dto: UserDto
  ): Promise<User> {
    try {
      const user: User = UserController.createUser(dto);

      return await this.userService.create(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of users
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of User entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions
  ): Promise<[User[], number]> {
    try {
      return await this.userService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A single user
   *
   * @param id - User id
   * @param options - Serialised query string params for filtering
   *
   * @return A User entity
   */
  @Get(':id')
  public async getUser (
    @Param('id') id: string,
    @Filter() options: FilterOptions
  ): Promise<User> {
    try {
      const user: User = await this.userService.findOne(id, options);

      if (Boolean(user)) {
        return user;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a user
   *
   * @param id - User id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.userService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a user
   *
   * @param dto - User data transfer object
   * @param id - User id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: UserDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      const user: User = UserController.createUser(dto);

      count = await this.userService.update(id, user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
