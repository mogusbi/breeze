import {ApiModelProperty} from '@nestjs/swagger';
import {PaginationResult} from 'shared/pagination';

export class Role {
  @ApiModelProperty() public readonly name: string;
  @ApiModelProperty() public readonly protect: boolean;
}

export class Roles extends PaginationResult<Role> {}
