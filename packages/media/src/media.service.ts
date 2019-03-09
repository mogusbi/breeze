/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Media} from './media.entity';
import {MediaEnum} from './media.enum';

/**
 * Service used to query media database table
 */
@Injectable()
export class MediaService {
  /**
   * @param media - Media repository
   */
  constructor (
    @Inject(MediaEnum.providerToken) private readonly media: Repository<Media>
  ) {}

  /**
   * Create a new media entity
   *
   * @param media - New media entity
   *
   * @returns The newly created media entity
   */
  public async create (media: Media): Promise<Media> {
    const entity: Media = this.media.create(media);

    return this.media.save(entity);
  }

  /**
   * Find a single media entity by id
   *
   * @param id - Media entity id
   * @param options - Filter options
   *
   * @return Media entity
   */
  public async findOne (id: string, options: FilterOptions<Media>): Promise<Media> {
    return this.media.findOne(id, options);
  }

  /**
   * List all media entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of media and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions<Media>): Promise<[Media[], number]> {
    return this.media.findAndCount(options);
  }

  /**
   * Removes a media entity
   *
   * @param id - Media entity id
   *
   * @returns The number of media entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.media.delete(id);

    return affectedRows;
  }

  /**
   * Updates a media entity
   *
   * @param id - Media entity id
   * @param media - Media entity
   *
   * @returns The number of media entities that have been updated
   */
  public async update (id: string, media: Media): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.media.update(id, media);

    return affectedRows;
  }
}
