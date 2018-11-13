import {Body, Controller, Post} from '@nestjs/common';
import {UserDto} from './user.dto';
// import {User} from './user.schema';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Post()
  public async httpPost (
    @Body() user: UserDto
  ): Promise<void> {
    await this.userService.create(user);
  }
}
