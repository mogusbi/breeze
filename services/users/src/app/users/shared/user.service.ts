/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions, PaginationOptions} from '@breezejs/request';
import {User} from '@breezejs/sql';
import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {UserEnum} from './user.enum';

/**
 * Service used to query user database table
 */
@Injectable()
export class UserService {
  /**
   * @param user - User repository
   */
  constructor (
    @Inject(UserEnum.providerToken) private readonly user: Repository<User>
  ) {}

  /**
   * Create a new user entity
   *
   * @param user - New user entity
   *
   * @returns The newly created user entity
   */
  public async create (user: User): Promise<User> {
    const entity: User = this.user.create(user);

    return this.user.save(entity);
  }

  /**
   * Find a single user entity by id
   *
   * @param id - User entity id
   * @param options - Filter options
   *
   * @return User entity
   */
  public async findOne (id: string, options: FilterOptions): Promise<User> {
    return this.user
      .createQueryBuilder('user')
      .select(options.select)
      .where('user.id = :id', {
        id
      })
      .getOne();
  }

  /**
   * List all user entities in a paginated list
   *
   * @param options - Pagination options
   *
   * @returns A paginated list of users and the total number of entities in the database
   */
  public async listAll (options: PaginationOptions): Promise<[User[], number]> {
    return this.user
      .createQueryBuilder('user')
      .select(options.select)
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.order)
      .getManyAndCount();
  }

  /**
   * Removes a user entity
   *
   * @param id - User entity id
   *
   * @returns The number of user entities that have been removed
   */
  public async remove (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.user.delete(id);

    return affectedRows;
  }

  /**
   * Updates a user entity
   *
   * @param id - User entity id
   * @param user - User entity
   *
   * @returns The number of user entities that have been updated
   */
  public async update (id: string, user: User): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.user.update(id, user);

    return affectedRows;
  }
}
