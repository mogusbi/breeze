/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity, OneToMany} from 'typeorm';
import {Base} from '../../base';
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
