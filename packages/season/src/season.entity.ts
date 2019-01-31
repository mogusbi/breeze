/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import {Column, Entity} from 'typeorm';

/**
 * Season entity
 */
@Entity()
export class Season extends Base {
  @Column({
    unique: true
  })
  public name: string;
}
