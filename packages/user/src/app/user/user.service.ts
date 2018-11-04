import {DynamoService} from '@breeze-bb/core';
import {Injectable} from '@nestjs/common';
import {User} from './user.schema';

@Injectable()
export class UserService {
  constructor (
    private readonly dynamoService: DynamoService
  ) {}

  // TODO: DTO
  public async create (properties: any): Promise<User> {
    return this.dynamoService.dataMapper.put<User>(properties);
  }
}
