/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Base} from '@breezejs/sql';
import slugify from '@sindresorhus/slugify';
import {Column, Entity} from 'typeorm';

/**
 * Article entity
 */
@Entity()
export class Article extends Base {
  @Column()
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
    type: 'text'
  })
  public teaser: string;

  @Column({
    nullable: false
  })
  public title: string;

  private _slug: string;

  @Column({
    nullable: false,
    unique: true
  })
  public get slug (): string {
    return this._slug;
  }

  /**
   * Set the article slug
   *
   * @param slug - Article slug
   */
  public set slug (slug: string) {
    if (Boolean(slug)) {
      this._slug = slug;
    } else {
      this._slug = this.createSlug();
    }
  }

  /**
   * Auto-generates a slug URL
   *
   * @returns slug
   */
  private createSlug (): string {
    const publishDate: Date = new Date(this.publishDate);
    const date: string = `${publishDate.getUTCFullYear()}/${publishDate.getUTCMonth() + 1}/${publishDate.getUTCDate()}`;
    const slug: string = slugify(this.title);

    return `${date}/${slug}`;
  }
}
