/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {Team} from '@breezejs/sql';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
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
   * @param team - New team entity
   *
   * @returns The newly created team entity
   */
  public async create (team: Team): Promise<Team> {
    const entity: Team = this.team.create(team);

    return this.team.save(entity);
  }

  /**
   * Find a single team entity by id
   *
   * @param id - Team entity id
   * @param options - Filter options
   *
   * @return Team entity
   */
  public async findOne (id: string, options: FilterOptions): Promise<Team> {
    return this.team
      .createQueryBuilder('team')
      .select(options.select)
      .where('team.id = :id', {
        id
      })
      .getOne();
  }

  /**
   * List all team entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of teams and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions): Promise<[Team[], number]> {
    return this.team
      .createQueryBuilder('team')
      .select(options.select)
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.order)
      .getManyAndCount();
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
   * @param team - Team entity
   *
   * @returns The number of team entities that have been updated
   */
  public async update (id: string, team: Team): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.team.update(id, team);

    return affectedRows;
  }
}
