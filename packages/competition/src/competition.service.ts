/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Competition} from './competition.entity';
import {CompetitionEnum} from './competition.enum';

/**
 * Service used to query competition database table
 */
@Injectable()
export class CompetitionService {
  /**
   * @param competition - Competition repository
   */
  constructor (
    @Inject(CompetitionEnum.providerToken) private readonly competition: Repository<Competition>
  ) {}

  /**
   * Create a new competition entity
   *
   * @param competition - New competition entity
   *
   * @returns The newly created competition entity
   */
  public async create (competition: Competition): Promise<Competition> {
    const entity: Competition = this.competition.create(competition);

    return this.competition.save(entity);
  }

  /**
   * Find a single competition entity by id
   *
   * @param id - Competition entity id
   * @param options - Filter options
   *
   * @return Competition entity
   */
  public async findOne (id: string, options: FilterOptions<Competition>): Promise<Competition> {
    return this.competition.findOne(id, options);
  }

  /**
   * List all competition entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of competitions and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions<Competition>): Promise<[Competition[], number]> {
    return this.competition.findAndCount(options);
  }

  /**
   * Removes a competition entity
   *
   * @param id - Competition entity id
   *
   * @returns The number of competition entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.competition.delete(id);

    return affectedRows;
  }

  /**
   * Updates a competition entity
   *
   * @param id - Competition entity id
   * @param competition - Competition entity
   *
   * @returns The number of competition entities that have been updated
   */
  public async update (id: string, competition: Competition): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.competition.update(id, competition);

    return affectedRows;
  }
}
