/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Request} from 'express';
import {FilterOptions} from './filter.model';

/**
 * Filter helper factory
 *
 * @param _ - data
 * @param request - Express request
 * @param request.query - Request query params object
 *
 * @return Filter options object
 */
export function FilterFactory (_: string, {query}: Request): FilterOptions {
  let select: string[] = query.fields ? query.fields.split(',') : [];

  select = select.length === 0 ? null : select;

  return {
    select
  };
}
