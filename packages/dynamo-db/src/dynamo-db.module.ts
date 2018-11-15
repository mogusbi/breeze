/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {DynamoDb} from './dynamo-db';

/**
 * Dynamo DB Module. This uses dynamodb data mapper in the background
 */
@Module({
  exports: [
    DynamoDb
  ],
  providers: [
    DynamoDb
  ]
})
export class DynamoDbModule {}
