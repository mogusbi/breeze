/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

/**
 * Data transfer object for a user entity
 */
export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  public emailAddress: string;

  @IsNotEmpty()
  @IsString()
  public forename: string;

  @IsNotEmpty()
  @IsString()
  public surname: string;
}
