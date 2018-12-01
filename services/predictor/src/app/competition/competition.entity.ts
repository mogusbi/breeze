/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breeze/sql';
import {Column, Entity} from 'typeorm';

/**
 * Competition entity
 */
@Entity()
export class Competition extends Base {
  @Column({
    unique: true
  })
  public name: string;
}
