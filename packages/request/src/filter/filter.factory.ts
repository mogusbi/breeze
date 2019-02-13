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
export function FilterFactory<T = unknown> (_: string, {query}: Request): FilterOptions<T> {
  const split: RegExp = /\./;

  let select: (keyof T)[] = query.fields ? query.fields
    .split(',')
    .filter((field: keyof T): boolean => !split.test(<string>field)) : [];

  select = select.length === 0 ? null : select;

  const relations: string[] = query.fields ? query.fields
    .split(',')
    .filter((field: keyof T): boolean => split.test(<string>field))
    .map((field: keyof T): string => <string>field) : [];

  return {
    relations,
    select
  };
}
