import {createRouteParamDecorator} from '@nestjs/common';
import config from 'config';
import {Request} from 'express';
import {PaginationOptions} from './pagination.model';

export const Pagination: Function = createRouteParamDecorator(
  (_: string, req: Request): PaginationOptions => {
    req.query.limit = (typeof req.query.limit === 'number') ?
      req.query.limit :
      parseInt(req.query.limit, 10) || config.pagination.size;

    req.query.page = (typeof req.query.page === 'number') ?
      req.query.page :
      parseInt(req.query.page, 10) || 1;

    if (req.query.limit > config.pagination.max) {
      req.query.limit = config.pagination.max;
    } else if (req.query.limit < config.pagination.min) {
      req.query.limit = config.pagination.min;
    }

    const limit: number = req.query.limit;
    const page: number = req.query.page;

    return {
      limit,
      page
    };
  }
);
