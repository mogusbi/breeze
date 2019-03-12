/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity} from 'typeorm';
import {Base} from '../../base';

/**
 * User entity
 */
@Entity()
export class User extends Base {
  @Column({
    unique: true
  })
  public emailAddress: string;

  @Column()
  public forename: string;

  @Column()
  public surname: string;
}
