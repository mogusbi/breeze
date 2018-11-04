import {Body, Controller, Post} from '@nestjs/common';
import {User} from './user.schema';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  // TODO: DTO
  @Post()
  public async httpPost (
    @Body() user: any
  ): Promise<User> {
    return this.userService.create(user);
  }
}
