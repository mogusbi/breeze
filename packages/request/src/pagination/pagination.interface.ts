/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {PaginationOrderType} from './pagination.type';

export interface IPaginationOrder {
  [name: string]: PaginationOrderType;
}
