/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Request} from 'express';
import {FilterFactory, FilterOptions} from '../filter';
import {PaginationEnum} from './pagination.enum';
import {PaginationOptions} from './pagination.model';
import {PaginationOrderType} from './pagination.type';

/**
 * Pagination helper factory
 *
 * @param _ - data
 * @param request - Express request
 *
 * @returns Pagination options object
 */
export function PaginationFactory<T = unknown> (_: string, request: Request): PaginationOptions<T> {
  const {query}: Request = request;

  let dir: PaginationOrderType = query.dir;
  let page: number = query.page;
  let take: number = query.limit;

  if (page !== undefined) {
    page = typeof page === 'number' ? page : parseInt(page, 10);
  } else {
    page = 1;
  }

  if (take !== undefined) {
    take = typeof take === 'number' ? take : parseInt(take, 10);
  } else {
    take = PaginationEnum.size;
  }

  if (take > PaginationEnum.max) {
    take = PaginationEnum.max;
  } else if (take < PaginationEnum.min) {
    take = PaginationEnum.min;
  }

  const select: FilterOptions<T> = FilterFactory(_, request);
  const sort: string = query.sort;
  const skip: number = take * (page - 1);
  const result: PaginationOptions<T> = {
    ...select,
    order: {},
    page,
    skip,
    take
  };

  let orderType: PaginationOrderType = PaginationEnum.asc;

  if (dir !== undefined) {
    dir = <PaginationOrderType>dir.toUpperCase();

    if (dir === PaginationEnum.asc || dir === PaginationEnum.desc) {
      orderType = dir;
    }
  }

  if (sort !== undefined) {
    result.order[sort] = orderType;
  }

  return result;
}
