/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID} from 'class-validator';

/**
 * Data transfer object for a fixture entity
 */
export class FixtureDto {
  @IsNotEmpty()
  @IsUUID('4')
  public away: string;

  @IsNumber()
  @IsOptional()
  public awayScore: number;

  @IsNotEmpty()
  @IsUUID('4')
  public competition: string;

  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @IsNotEmpty()
  @IsUUID('4')
  public home: string;

  @IsNumber()
  @IsOptional()
  public homeScore: number;

  @IsNotEmpty()
  @IsUUID('4')
  public season: string;
}
