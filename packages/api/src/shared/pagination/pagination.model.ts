import {ApiModelProperty} from '@nestjs/swagger';

export class PaginationResult<T> {
  @ApiModelProperty({
    isArray: true
  }) public readonly docs: T;
  @ApiModelProperty() public readonly limit: number;
  @ApiModelProperty() public readonly page: number;
  @ApiModelProperty() public readonly pages: number;
  @ApiModelProperty() public readonly total: number;
}

export class PaginationOptions {
  public readonly limit: number;
  public readonly page: number;
}
