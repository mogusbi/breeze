/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import slugify from '@sindresorhus/slugify';
import {BeforeInsert, Column, Entity, ManyToOne} from 'typeorm';
import {Base} from '../../base';
import {Media} from '../media';
import {User} from '../user';

/**
 * Article entity
 */
@Entity()
export class Article extends Base {
  @Column({
    nullable: true
  })
  public alternativeTitle: string;

  @ManyToOne((): typeof User => User)
  public author: User;

  @Column({
    nullable: false,
    type: 'text'
  })
  public content: string;

  @ManyToOne((): typeof Media => Media)
  public media: Media;

  @Column({
    nullable: false,
    type: 'timestamp'
  })
  public publishDate: string;

  @Column({
    nullable: false,
    unique: true
  })
  public slug: string;

  @Column({
    nullable: true,
    type: 'text'
  })
  public teaser: string;

  @Column({
    nullable: false
  })
  public title: string;

  /**
   * Auto-generates a slug URL
   */
  @BeforeInsert()
  public createSlug (): void {
    if (!Boolean(this.slug)) {
      const publishDate: Date = new Date(this.publishDate);
      const date: string = `${publishDate.getUTCFullYear()}/${publishDate.getUTCMonth() + 1}/${publishDate.getUTCDate()}`;
      const slug: string = slugify(this.title);

      this.slug = `${date}/${slug}`;
    }
  }
}
