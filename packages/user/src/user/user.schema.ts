import {attribute, table} from '@aws/dynamodb-data-mapper-annotations';
import {EntitySchema} from '@breeze-bb/core';

@table('Users')
export class User extends EntitySchema {
  @attribute()
  public firstName: string;

  @attribute()
  public emailAddress: string;

  @attribute()
  public salt: string;

  @attribute()
  public surname: string;

  @attribute()
  public username: string;
}
