import {DataMapper} from '@aws/dynamodb-data-mapper';
import {Injectable} from '@nestjs/common';
import {DynamoDB} from 'aws-sdk';

@Injectable()
export class DynamoService {
  public readonly dataMapper: DataMapper;
  private readonly dynamoDb: DynamoDB;

  constructor () {
    // TODO: Configure for local and prod
    this.dynamoDb = new DynamoDB();
    this.dataMapper = new DataMapper({
      client: this.dynamoDb
    });
  }
}
