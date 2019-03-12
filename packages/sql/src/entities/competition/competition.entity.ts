/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity} from 'typeorm';
import {Base} from '../../base';

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
