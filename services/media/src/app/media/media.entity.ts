/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import {Column, Entity, OneToMany} from 'typeorm';
import {MediaSource} from './media-source';

@Entity()
export class Media extends Base {
  @Column({
    nullable: true
  })
  public copyright: string;

  @Column({
    nullable: true
  })
  public description: string;

  @OneToMany(
    (): typeof MediaSource => MediaSource,
    ({parent}: MediaSource): Media => parent,
    {
      cascade: true,
      eager: true
    }
  )
  public source: MediaSource[];
}
