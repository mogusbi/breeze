/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breeze-bb/sql';
import {Column, Entity} from 'typeorm';

/**
 * Team entity
 */
@Entity()
export class Team extends Base {
  @Column()
  public name: string;
}
