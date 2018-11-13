import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  public firstName: string;

  @IsEmail()
  public emailAddress: string;

  @IsNotEmpty()
  public surname: string;

  @IsNotEmpty()
  public username: string;
}
