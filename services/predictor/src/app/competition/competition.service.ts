/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breeze/request';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CompetitionDto} from './competition.dto';
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
   * @param dto - Data transfer object
   *
   * @returns The new competition entity
   */
  public async create (dto: CompetitionDto): Promise<Competition> {
    const competition: Competition = this.competition.create(dto);

    return this.competition.save(competition);
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
   * @param dto - Data transfer object
   *
   * @returns The number of competition entities that have been updated
   */
  public async update (id: string, dto: CompetitionDto): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.competition.update(id, dto);

    return affectedRows;
  }
}
