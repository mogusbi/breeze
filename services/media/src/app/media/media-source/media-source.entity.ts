/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Media} from '../media.entity';

@Entity()
export class MediaSource {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    nullable: false
  })
  public name: string;

  @ManyToOne(
    (): typeof Media => Media,
    ({source}: Media): MediaSource[] => source,
    {
      nullable: false,
      onDelete: 'CASCADE'
    }
  )
  public parent: Media;

  @Column({
    nullable: false,
    unique: true
  })
  public path: string;
}
