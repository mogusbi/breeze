/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsOptional, IsString, ValidateNested} from 'class-validator';
import {MediaSourceDto} from './media-source';

/**
 * Data transfer object for a media entity
 */
export class MediaDto {
  @IsOptional()
  @IsString()
  public copyright: string;

  @IsOptional()
  @IsString()
  public description: string;

  @ValidateNested({
    each: true
  })
  public source: MediaSourceDto[];
}
