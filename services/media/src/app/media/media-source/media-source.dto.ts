/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsNotEmpty, IsString} from 'class-validator';

/**
 * Data transfer object for a media source entity
 */
export class MediaSourceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public path: string;
}
