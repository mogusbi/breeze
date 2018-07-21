import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {PaginationResult} from 'shared/pagination';

// TODO: Security questions
// TODO: Password and answer hashing
// TODO: Password confirm
// TODO: Salt
export class User {
  @ApiModelProperty() public readonly _id: string;
  @ApiModelProperty() public readonly emailAddress: string;
  @ApiModelProperty() public readonly firstName: string;
  @ApiModelProperty() public readonly surname: string;
  @ApiModelProperty() public readonly username: string;
}

export class Users extends PaginationResult {
  @ApiModelProperty({
    isArray: true,
    type: User
  }) public readonly docs: User[];
}

export class UserCreateDto {
  @ApiModelProperty()
  @IsEmail()
  public readonly emailAddress: string;

  @ApiModelProperty()
  @IsString()
  public readonly firstName: string;

  @ApiModelProperty()
  @IsString()
  public readonly password: string;

  @ApiModelProperty()
  @IsString()
  public readonly surname: string;

  @ApiModelProperty()
  @IsString()
  public readonly username: string;
}
