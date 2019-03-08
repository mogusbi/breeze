/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

/**
 * Data transfer object for a article entity
 */
export class ArticleDto {
  @IsOptional()
  @IsString()
  public alternativeTitle: string;

  @IsNotEmpty()
  @IsUUID('4')
  public authorId: string;

  @IsNotEmpty()
  @IsString()
  public content: string;

  @IsNotEmpty()
  @IsDateString()
  public publishDate: string;

  @IsOptional()
  @IsString()
  public teaser: string;

  @IsNotEmpty()
  @IsString()
  public title: string;
}
