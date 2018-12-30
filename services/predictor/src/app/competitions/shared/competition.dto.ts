/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsNotEmpty, IsString} from 'class-validator';

/**
 * Data transfer object for a competition entity
 */
export class CompetitionDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}
