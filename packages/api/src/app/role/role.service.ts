import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {PaginateModel} from 'mongoose';
import {PaginationOptions, PaginationResult} from 'shared/pagination';
import {RoleDto} from './role.dto';
import {IRole} from './role.interface';
import {RoleSchema} from './role.schema';

@Component()
export class RoleService {
  constructor (
    @InjectModel(RoleSchema) private readonly model: PaginateModel<IRole>
  ) {}

  public async create (props: RoleDto): Promise<IRole> {
    const {_id}: IRole = await new this.model(props).save();

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

  public async readAll (pagination: PaginationOptions): Promise<PaginationResult<IRole>> {
    return this.model.paginate({}, {
      ...pagination,
      select: 'name protect',
      sort: 'name'
    }) as Promise<PaginationResult<IRole>>;
  }

  public async readOne (_id: string): Promise<IRole> {
    return this.model
      .findById({
        _id
      })
      .select('name protect')
      .exec();
  }

  public async update (_id: string, props: RoleDto): Promise<IRole> {
    return this.model
      .findByIdAndUpdate({
        _id
      }, props, {
        new: true
      })
      .select('name protect')
      .exec();
  }
}
