/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {Article} from '@breezejs/sql';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {ArticleEnum} from './article.enum';

/**
 * Service used to query article database table
 */
@Injectable()
export class ArticleService {
  /**
   * @param article - Article repository
   */
  constructor (
    @Inject(ArticleEnum.providerToken) private readonly article: Repository<Article>
  ) {}

  /**
   * Create a new article entity
   *
   * @param article - New article entity
   *
   * @returns The newly created article entity
   */
  public async create (article: Article): Promise<Article> {
    const entity: Article = this.article.create(article);

    return this.article.save(entity);
  }

  /**
   * Find a single article entity by id
   *
   * @param id - Article entity id
   * @param options - Filter options
   *
   * @return Article entity
   */
  public async findOne (id: string, options: FilterOptions): Promise<Article> {
    return this.article
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.author', 'user')
      .innerJoinAndSelect('article.media', 'media')
      .innerJoinAndSelect('media.source', 'media_source')
      .select(options.select)
      .where('article.id = :id', {
        id
      })
      .getOne();
  }

  /**
   * List all article entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of articles and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions): Promise<[Article[], number]> {
    return this.article
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.author', 'user')
      .innerJoinAndSelect('article.media', 'media')
      .innerJoinAndSelect('media.source', 'media_source')
      .select(options.select)
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.order)
      .getManyAndCount();
  }

  /**
   * Removes a article entity
   *
   * @param id - Article entity id
   *
   * @returns The number of article entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.article.delete(id);

    return affectedRows;
  }

  /**
   * Updates a article entity
   *
   * @param id - Article entity id
   * @param article - Article entity
   *
   * @returns The number of article entities that have been updated
   */
  public async update (id: string, article: Article): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.article.update(id, article);

    return affectedRows;
  }
}
