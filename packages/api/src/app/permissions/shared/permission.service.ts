import {Component, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {PaginateModel} from 'mongoose';
import {NoContentException} from 'shared/exceptions';
import {PaginationOptions} from 'shared/pagination';
import {IPermission} from './permission.interface';
import {Permission, PermissionCreateDto, Permissions, PermissionUpdateDto} from './permission.model';
import {PermissionSchema} from './permission.schema';

@Component()
export class PermissionService {
  constructor (
    @InjectModel(PermissionSchema) private readonly model: PaginateModel<IPermission>
  ) {}

  public async create ({name, protect}: PermissionCreateDto): Promise<Permission> {
    const {_id}: IPermission = await new this.model({
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

  public async readAll ({limit, page}: PaginationOptions): Promise<Permissions> {
    const results: Permissions = await this.model.paginate({}, {
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

  public async readList (): Promise<Permission[]> {
    const results: Permission[] = await this.model
      .find({})
      .select('name protect')
      .exec();

    if (results.length === 0) {
      throw new NoContentException();
    }

    return results;
  }

  public async readOne (_id: string): Promise<Permission> {
    const result: Permission = await this.model
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

  public async update (_id: string, {name, protect}: PermissionUpdateDto): Promise<Permission> {
    const result: Permission = await this.model
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
