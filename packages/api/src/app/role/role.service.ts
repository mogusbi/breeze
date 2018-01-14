import {Component, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {PaginateModel} from 'mongoose';
import {NoContentException} from 'shared/exceptions';
import {PaginationOptions} from 'shared/pagination';
import {IRole} from './role.interface';
import {Role, RoleCreateDto, Roles, RoleUpdateDto} from './role.model';
import {RoleSchema} from './role.schema';

@Component()
export class RoleService {
  constructor (
    @InjectModel(RoleSchema) private readonly model: PaginateModel<IRole>
  ) {}

  public async create ({name, protect}: RoleCreateDto): Promise<Role> {
    const {_id}: IRole = await new this.model({
      name,
      protect
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

  public async readAll ({limit, page}: PaginationOptions): Promise<Roles> {
    const results: Roles = await this.model.paginate({}, {
      limit,
      page,
      select: 'name protect',
      sort: 'name'
    });

    if (results.docs.length === 0) {
      throw new NoContentException();
    }

    return results;
  }

  public async readOne (_id: string): Promise<Role> {
    const result: Role = await this.model
      .findById({
        _id
      })
      .select('name protect')
      .exec();

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  public async update (_id: string, {name, protect}: RoleUpdateDto): Promise<Role> {
    const result: Role = await this.model
      .findByIdAndUpdate(
        {
          _id
        },
        {
          name,
          protect
        },
        {
          new: true
        }
      )
      .select('name protect')
      .exec();

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
