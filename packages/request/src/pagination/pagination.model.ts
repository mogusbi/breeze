/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {FilterOptions} from '../filter';
import {IPaginationOrder} from './pagination.interface';

/**
 * Paginated results entity
 */
export class PaginationResult<R> {
  public readonly items: R[];
  public readonly limit: number;
  public readonly page: number;
  public readonly pages: number;
  public readonly total: number;
}

/**
 * Paginated request options
 */
export class PaginationOptions<R> extends FilterOptions<R> {
  public readonly order: IPaginationOrder;
  public readonly page: number;
  public readonly take: number;
  public readonly skip: number;
}
