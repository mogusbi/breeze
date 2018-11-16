/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

/**
 * Team entity
 */
@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;
}
