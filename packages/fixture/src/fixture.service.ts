/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {Fixture} from '@breezejs/sql';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {FixtureEnum} from './fixture.enum';

/**
 * Service used to query fixture database table
 */
@Injectable()
export class FixtureService {
  /**
   * @param fixture - Fixture repository
   */
  constructor (
    @Inject(FixtureEnum.providerToken) private readonly fixture: Repository<Fixture>
  ) {}

  /**
   * Create a new fixture entity
   *
   * @param fixture - New fixture entity
   *
   * @returns The newly created fixture entity
   */
  public async create (fixture: Fixture): Promise<Fixture> {
    const entity: Fixture = this.fixture.create(fixture);

    return this.fixture.save(entity);
  }

  /**
   * Find a single fixture entity by id
   *
   * @param id - Fixture entity id
   * @param options - Filter options
   *
   * @return Fixture entity
   */
  public async findOne (id: string, options: FilterOptions): Promise<Fixture> {
    return this.fixture
      .createQueryBuilder('fixture')
      .innerJoinAndSelect('fixture.away', 'away')
      .innerJoinAndSelect('fixture.competition', 'competition')
      .innerJoinAndSelect('fixture.home', 'home')
      .innerJoinAndSelect('fixture.season', 'season')
      .select(options.select)
      .where('fixture.id = :id', {
        id
      })
      .getOne();
  }

  /**
   * List all fixture entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of fixtures and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions): Promise<[Fixture[], number]> {
    return this.fixture
      .createQueryBuilder('fixture')
      .innerJoinAndSelect('fixture.away', 'away')
      .innerJoinAndSelect('fixture.competition', 'competition')
      .innerJoinAndSelect('fixture.home', 'home')
      .innerJoinAndSelect('fixture.season', 'season')
      .select(options.select)
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.order)
      .getManyAndCount();
  }

  /**
   * Removes a fixture entity
   *
   * @param id - Fixture entity id
   *
   * @returns The number of fixture entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.fixture.delete(id);

    return affectedRows;
  }

  /**
   * Updates a fixture entity
   *
   * @param id - Fixture entity id
   * @param fixture - Fixture entity
   *
   * @returns The number of fixture entities that have been updated
   */
  public async update (id: string, fixture: Fixture): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.fixture.update(id, fixture);

    return affectedRows;
  }
}
