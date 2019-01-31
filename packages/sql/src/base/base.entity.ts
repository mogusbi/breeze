/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

/**
 * Base entity class that should be inherited by other entities
 */
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({
    type: 'timestamp'
  })
  public createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  public updatedAt: string;
}
