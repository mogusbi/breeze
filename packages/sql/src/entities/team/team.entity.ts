/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity} from 'typeorm';
import {Base} from '../../base';

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
