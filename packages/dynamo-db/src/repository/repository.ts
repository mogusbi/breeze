/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {CreateTableOptions, DataMapper} from '@aws/dynamodb-data-mapper';
import {ZeroArgumentsConstructor} from '@aws/dynamodb-data-marshaller';
import {DynamoDB} from 'aws-sdk';
import {ClientConfiguration} from 'aws-sdk/clients/dynamodb';
import {Base} from '../base';

/**
 * Adds methods to a Dynamo DB entity
 */
export class Repository<Entity extends Base> {
  private readonly dataMapper: DataMapper;

  constructor () {
    // TODO: Sort out region
    const config: ClientConfiguration = {
      region: 'eu-west-1'
    };

    if (Boolean(process.env.DYNAMO_DB_ENDPOINT)) {
      config.endpoint = process.env.DYNAMO_DB_ENDPOINT;
    }

    const client: DynamoDB = new DynamoDB(config);

    this.dataMapper = new DataMapper({
      client
    });
  }

  /**
   * Creates a new item
   *
   * @param entity - Entity to create
   *
   * @returns Created item
   */
  public async create (entity: Entity): Promise<Entity> {
    return this.dataMapper.put<Entity>(entity);
  }

  /**
   * Creates a new database table
   *
   * @param entity - The constructor used for values in the table
   * @param options - Options to create table
   */
  public async createTable<T> (entity: ZeroArgumentsConstructor<T>, options: CreateTableOptions): Promise<void> {
    await this.dataMapper.ensureTableExists(entity, options);
  }

  /**
   * Deletes a database table
   *
   * @param entity - The constructor used for values in the table
   */
  public async deleteTable<T> (entity: ZeroArgumentsConstructor<T>): Promise<void> {
    await this.dataMapper.ensureTableNotExists(entity);
  }

  /**
   * Finds an item by ID
   *
   * @param id - The ID of the item to find
   * @param entity - Entity
   *
   * @returns Retrieved item
   */
  public async findOne (id: string, entity: Entity): Promise<Entity> {
    entity.id = id;

    return this.dataMapper.get<Entity>(entity);
  }

  /**
   * Deletes an item
   *
   * @param id - The ID of the item to delete
   * @param entity - Entity
   *
   * @returns Deleted item
   */
  public async remove (id: string, entity: Entity): Promise<Entity> {
    entity.id = id;

    return this.dataMapper.delete<Entity>(entity);
  }

  /**
   * Updates an item
   *
   * @param id - The ID of the item to update
   * @param entity - Updated item
   *
   * @returns Updated item
   */
  public async update (id: string, entity: Entity): Promise<Entity> {
    const date: Date = new Date();

    entity.id = id;
    entity.updatedAt = date.toISOString();

    return this.dataMapper.update<Entity>(entity);
  }
}
