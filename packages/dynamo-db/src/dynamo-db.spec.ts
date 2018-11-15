/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {DataMapper} from '@aws/dynamodb-data-mapper';
import {Test, TestingModule} from '@nestjs/testing';
import {DynamoDb} from './dynamo-db';

describe('DynamoDb', (): void => {
  let dynamoDb: DynamoDb;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          DynamoDb
        ]
      })
      .compile();

    dynamoDb = testModule.get<DynamoDb>(DynamoDb);

    DataMapper.prototype.put = jest.fn();
  });

  describe('insert', (): void => {
    it('should call Dynamo put method with the correct params', async (): Promise<void> => {
      const result: unknown = {
        _id: 'Test Id',
        value: 'Something'
      };

      await dynamoDb.insert(result);

      expect(DataMapper.prototype.put).toHaveBeenCalledWith(result);
    });
  });
});
