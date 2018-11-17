/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Request} from 'express';
import {PaginationEnum} from './pagination.enum';
import {PaginationOptions} from './pagination.model';
import {PaginationOrderType} from './pagination.type';

/**
 * Pagination helper factory
 *
 * @returns An object with the limit and page number
 */
export function PaginationFactory<T = unknown> (_: string, {query}: Request): PaginationOptions<T> {
  let page: number = query.page;
  let take: number = query.limit;

  page = typeof page === 'number' ? page : parseInt(page, 10) || 1;
  take = typeof take === 'number' ? take : parseInt(take, 10) || PaginationEnum.size;

  if (take > PaginationEnum.max) {
    take = PaginationEnum.max;
  } else if (take < PaginationEnum.min) {
    take = PaginationEnum.min;
  }

  const select: (keyof T)[] = query.fields ? query.fields.split(',') : null;
  const skip: number = take * (page - 1);
  const result: PaginationOptions<T> = {
    order: {},
    page,
    select,
    skip,
    take
  };
  const sort: string = query.sort;

  let dir: PaginationOrderType = query.dir.toUpperCase();

  dir = dir === PaginationEnum.asc || dir === PaginationEnum.desc ? dir : PaginationEnum.asc;

  if (sort && dir) {
    result.order[sort] = dir;
  }

  return result;
}
