/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Base} from '../../base';
import {Competition} from '../competition';
import {Season} from '../season';
import {Team} from '../team';

/**
 * Fixture entity
 */
@Entity()
export class Fixture extends Base {
  @ManyToOne((): typeof Team => Team, {
    eager: true
  })
  @JoinColumn()
  public away: Team;

  @Column({
    nullable: true
  })
  public awayScore: number;

  @ManyToOne((): typeof Competition => Competition, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public competition: Competition;

  @Column({
    type: 'timestamp'
  })
  public date: string;

  @ManyToOne((): typeof Team => Team, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public home: Team;

  @Column({
    nullable: true
  })
  public homeScore: number;

  @ManyToOne((): typeof Season => Season, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public season: Season;
}
