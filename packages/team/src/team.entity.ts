/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import {Column, Entity} from 'typeorm';

/**
 * Team entity
 */
@Entity()
export class Team extends Base {
  @Column({
    unique: true
  })
  public name: string;
}
