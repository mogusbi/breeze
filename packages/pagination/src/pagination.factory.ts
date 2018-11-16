/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Request} from 'express';
import {PaginationEnum} from './pagination.enum';
import {PaginationOptions} from './pagination.model';

/**
 * Pagination helper factory
 *
 * @returns An object with the limit and page number
 */
export function PaginationFactory (_: string, {query}: Request): PaginationOptions {
  let take: number = query.limit;
  let page: number = query.page;

  take = typeof take === 'number' ? take : parseInt(take, 10) || PaginationEnum.size;
  page = typeof page === 'number' ? page : parseInt(page, 10) || 1;

  if (take > PaginationEnum.max) {
    take = PaginationEnum.max;
  } else if (take < PaginationEnum.min) {
    take = PaginationEnum.min;
  }

  const skip: number = take * (page - 1);

  return {
    skip,
    take
  };
}
