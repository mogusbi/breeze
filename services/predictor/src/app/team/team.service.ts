/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breeze/request';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {TeamDto} from './team.dto';
import {Team} from './team.entity';
import {TeamEnum} from './team.enum';

/**
 * Service used to query team database table
 */
@Injectable()
export class TeamService {
  /**
   * @param team - Team repository
   */
  constructor (
    @Inject(TeamEnum.providerToken) private readonly team: Repository<Team>
  ) {}

  /**
   * Create a new team entity
   *
   * @param dto - Data transfer object
   *
   * @returns The new team entity
   */
  public async create (dto: TeamDto): Promise<Team> {
    const team: Team = this.team.create(dto);

    return this.team.save(team);
  }

  /**
   * Find a single team entity by id
   *
   * @param id - Team entity id
   * @param options - Filter options
   *
   * @return Team entity
   */
  public async findOne (id: string, options: FilterOptions<Team>): Promise<Team> {
    return this.team.findOne(id, options);
  }

  /**
   * List all team entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of teams and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions<Team>): Promise<[Team[], number]> {
    return this.team.findAndCount(options);
  }

  /**
   * Removes a team entity
   *
   * @param id - Team entity id
   *
   * @returns The number of team entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.team.delete(id);

    return affectedRows;
  }

  /**
   * Updates a team entity
   *
   * @param id - Team entity id
   * @param dto - Data transfer object
   *
   * @returns The number of team entities that have been updated
   */
  public async update (id: string, dto: TeamDto): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.team.update(id, dto);

    return affectedRows;
  }
}
