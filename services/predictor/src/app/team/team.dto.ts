/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsNotEmpty, IsString} from 'class-validator';

/**
 * Data transfer object for a team entity
 */
export class TeamDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}
