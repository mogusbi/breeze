import {Module} from '@nestjs/common';
import {DynamoService} from './dynamo.service';

@Module({
  exports: [
    DynamoService
  ],
  providers: [
    DynamoService
  ]
})
export class DynamoModule {}
