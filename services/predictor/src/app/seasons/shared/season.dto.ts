/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsNotEmpty, IsString} from 'class-validator';

/**
 * Data transfer object for a season entity
 */
export class SeasonDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}
