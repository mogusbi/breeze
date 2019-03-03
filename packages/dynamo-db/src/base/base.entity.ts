/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {attribute, hashKey, rangeKey} from '@aws/dynamodb-data-mapper-annotations';
import {v4} from 'uuid';

/**
 * Base entity class that should be inherited by other entities
 */
export abstract class Base {
  @hashKey({
    defaultProvider (): string {
      return v4();
    }
  })
  public id: string;

  @rangeKey({
    defaultProvider (): string {
      const date: Date = new Date();

      return date.toISOString();
    }
  })
  public createdAt: string;

  @attribute({
    defaultProvider (): string {
      const date: Date = new Date();

      return date.toISOString();
    }
  })
  public updatedAt: string;
}
