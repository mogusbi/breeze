import {DataMapper} from '@aws/dynamodb-data-mapper';
import {Injectable} from '@nestjs/common';
import {DynamoDB} from 'aws-sdk';

@Injectable()
export class DynamoService {
  private readonly dataMapper: DataMapper;
  private readonly dynamoDb: DynamoDB;

  constructor () {
    // TODO: Configure for local and prod
    this.dynamoDb = new DynamoDB({
      endpoint: 'http://localhost:8000',
      region: 'eu-west-2'
    });
    this.dataMapper = new DataMapper({
      client: this.dynamoDb
    });
  }

  public async put <T> (data: T): Promise<T> {
    return this.dataMapper.put<T>(data);
  }

  public async remove <T> (data: T): Promise<T> {
    return this.dataMapper.delete<T>(data);
  }
}
