/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Season} from './season.entity';
import {SeasonEnum} from './season.enum';

/**
 * Service used to query season database table
 */
@Injectable()
export class SeasonService {
  /**
   * @param season - Season repository
   */
  constructor (
    @Inject(SeasonEnum.providerToken) private readonly season: Repository<Season>
  ) {}

  /**
   * Create a new season entity
   *
   * @param season - New season entity
   *
   * @returns The newly created season entity
   */
  public async create (season: Season): Promise<Season> {
    const entity: Season = this.season.create(season);

    return this.season.save(entity);
  }

  /**
   * Find a single season entity by id
   *
   * @param id - Season entity id
   * @param options - Filter options
   *
   * @return Season entity
   */
  public async findOne (id: string, options: FilterOptions<Season>): Promise<Season> {
    return this.season.findOne(id, options);
  }

  /**
   * List all season entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of seasons and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions<Season>): Promise<[Season[], number]> {
    return this.season.findAndCount(options);
  }

  /**
   * Removes a season entity
   *
   * @param id - Season entity id
   *
   * @returns The number of season entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.season.delete(id);

    return affectedRows;
  }

  /**
   * Updates a season entity
   *
   * @param id - Season entity id
   * @param season - Season entity
   *
   * @returns The number of season entities that have been updated
   */
  public async update (id: string, season: Season): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.season.update(id, season);

    return affectedRows;
  }
}
