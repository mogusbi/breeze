/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {SqlProviders} from './sql.providers';

/**
 * SQL Module. This uses TypeORM in the background
 */
@Module({
  exports: [
    ...SqlProviders
  ],
  providers: [
    ...SqlProviders
  ]
})
export class SqlModule {}
