import {ApiModelProperty} from '@nestjs/swagger';
import {IsBoolean, IsString} from 'class-validator';
import {PaginationResult} from 'shared/pagination';

export class Role {
  @ApiModelProperty() public readonly _id: string;
  @ApiModelProperty() public readonly name: string;
  @ApiModelProperty() public readonly protect: boolean;
}

export class Roles extends PaginationResult {
  @ApiModelProperty({
    isArray: true,
    type: Role
  }) public readonly docs: Role[];
}

export class RoleCreateDto {
  @ApiModelProperty()
  @IsString()
  public readonly name: string;

  @ApiModelProperty()
  @IsBoolean()
  public readonly protect: boolean;
}

export class RoleUpdateDto {
  @ApiModelProperty()
  @IsString()
  public readonly name: string;

  @ApiModelProperty()
  @IsBoolean()
  public readonly protect: boolean;
}
