import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RoleDto} from './role.dto';
import {IRole} from './role.interface';
import {RoleSchema} from './role.schema';

@Component()
export class RoleService {
  constructor (
    @InjectModel(RoleSchema) private readonly model: Model<IRole>
  ) {}

  public async create (props: RoleDto): Promise<IRole> {
    const document: IRole = new this.model(props);

    return await document.save();
  }

  public async readAll (): Promise<IRole[]> {
    return this.model.find().exec();
  }
}
