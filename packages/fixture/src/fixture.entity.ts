/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition} from '@breezejs/competition';
import {Season} from '@breezejs/season';
import {Base} from '@breezejs/sql';
import {Team} from '@breezejs/team';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

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
