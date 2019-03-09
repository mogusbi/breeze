/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsArrayWithLength} from '@breezejs/validator';
import {Type} from 'class-transformer';
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
  @IsArrayWithLength()
  @Type((): typeof MediaSourceDto => MediaSourceDto)
  public source: MediaSourceDto[];
}
