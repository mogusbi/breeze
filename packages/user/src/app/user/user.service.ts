import {DynamoService} from '@breeze-bb/core';
import {Injectable} from '@nestjs/common';
import {UserDto} from './user.dto';
import {User} from './user.schema';

@Injectable()
export class UserService {
  constructor (
    private readonly dynamoService: DynamoService
  ) {}

  public async create (dto: UserDto): Promise<User> {
    // const user: User = Object.assign(new User(), dto);
    const user: User = new User();
    console.log(dto);

    return this.dynamoService.put<User>(user);
  }
}
