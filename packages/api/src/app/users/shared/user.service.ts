import {Component, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {PaginateModel} from 'mongoose';
import {NoContentException} from 'shared/exceptions';
import {PaginationOptions} from 'shared/pagination';
import {IUser} from './user.interface';
import {User, UserCreateDto, Users} from './user.model';
import {UserSchema} from './user.schema';

@Component()
export class UserService {
  constructor (
    @InjectModel(UserSchema) private readonly model: PaginateModel<IUser>
  ) {}

  public async create ({emailAddress, firstName, password, surname, username}: UserCreateDto): Promise<User> {
    const {_id}: User = await new this.model({
      emailAddress,
      firstName,
      password,
      surname,
      username
    }).save();

    return this.readOne(_id);
  }

  public async drop (_id: string): Promise<void> {
    await this.model
      .deleteOne({
        _id,
        protect: false
      })
      .exec();
  }

  public async readAll ({limit, page}: PaginationOptions): Promise<Users> {
    const results: Users = await this.model.paginate({}, {
      limit,
      page,
      select: 'username',
      sort: 'username'
    });

    if (results.docs.length === 0) {
      throw new NoContentException();
    }

    return results;
  }

  public async readList (): Promise<User[]> {
    const results: User[] = await this.model
      .find({})
      .select('username')
      .exec();

    if (results.length === 0) {
      throw new NoContentException();
    }

    return results;
  }

  public async readOne (_id: string): Promise<User> {
    const result: User = await this.model
      .findById({
        _id
      })
      .select('emailAddress firstName surname username')
      .exec();

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
