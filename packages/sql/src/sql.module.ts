/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

/**
 * SQL Module. This uses TypeORM in the background
 */
@Module({
  imports: [
    TypeOrmModule.forRoot()
  ]
})
export class SqlModule {}
