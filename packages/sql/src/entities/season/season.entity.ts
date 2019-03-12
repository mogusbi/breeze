/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity} from 'typeorm';
import {Base} from '../../base';

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
