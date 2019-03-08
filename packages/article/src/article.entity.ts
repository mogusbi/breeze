/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import slugify from '@sindresorhus/slugify';
import {BeforeInsert, Column, Entity} from 'typeorm';

/**
 * Article entity
 */
@Entity()
export class Article extends Base {
  @Column({
    nullable: true
  })
  public alternativeTitle: string;

  @Column({
    nullable: false,
    type: 'uuid'
  })
  public authorId: string;

  @Column({
    nullable: false,
    type: 'text'
  })
  public content: string;

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
