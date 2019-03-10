/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import {Column, Entity} from 'typeorm';

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
