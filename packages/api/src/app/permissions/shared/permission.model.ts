import {ApiModelProperty} from '@nestjs/swagger';
import {IsBoolean, IsString} from 'class-validator';
import {PaginationResult} from 'shared/pagination';

export class Permission {
  @ApiModelProperty() public readonly _id: string;
  @ApiModelProperty() public readonly name: string;
  @ApiModelProperty() public readonly protect: boolean;
}

export class Permissions extends PaginationResult {
  @ApiModelProperty({
    isArray: true,
    type: Permission
  }) public readonly docs: Permission[];
}

export class PermissionCreateDto {
  @ApiModelProperty()
  @IsString()
  public readonly name: string;

  @ApiModelProperty()
  @IsBoolean()
  public readonly protect: boolean;
}

export class PermissionUpdateDto {
  @ApiModelProperty()
  @IsString()
  public readonly name: string;

  @ApiModelProperty()
  @IsBoolean()
  public readonly protect: boolean;
}
