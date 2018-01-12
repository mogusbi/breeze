import {ApiModelProperty} from '@nestjs/swagger';

export class RoleDto {
  @ApiModelProperty() public readonly name: string;
  @ApiModelProperty() public readonly protect: boolean;
}
