/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import {Column, Entity, ManyToOne} from 'typeorm';
import {Media} from '../media.entity';

@Entity()
export class MediaSource extends Base {
  @Column({
    nullable: false
  })
  public name: string;

  @ManyToOne(
    (): typeof Media => Media,
    ({source}: Media): MediaSource[] => source,
    {
      eager: true
    }
  )
  public parent: Media;

  @Column({
    nullable: false
  })
  public path: string;
}
