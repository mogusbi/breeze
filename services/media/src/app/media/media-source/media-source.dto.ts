/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

/**
 * Data transfer object for a media source entity
 */
export class MediaSourceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsUrl({
    protocols: [
      'https'
    ],
    require_protocol: true
  })
  @IsNotEmpty()
  public path: string;
}
