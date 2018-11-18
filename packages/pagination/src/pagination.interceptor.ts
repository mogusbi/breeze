/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {ExecutionContext, HttpStatus, Injectable, NestInterceptor} from '@nestjs/common';
import {HttpArgumentsHost} from '@nestjs/common/interfaces';
import {Request, Response} from 'express';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginationFactory} from './pagination.factory';
import {PaginationOptions, PaginationResult} from './pagination.model';

/**
 * An interceptor that takes a findAndCount result and converts it into a pagination DTO
 */
@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor<[T[], number], PaginationResult<T> | void> {
  /**
   * Takes an input and returns that in a pagination DTO
   *
   * @param context - Execution context
   * @param call$ - An observable that returns the original input
   *
   * @return Paginated result DTO or nothing if no result returned
   */
  public intercept (context: ExecutionContext, call$: Observable<[T[], number]>): Observable<PaginationResult<T> | void> {
    return call$.pipe(
      map(
        ([items, total]: [T[], number]): PaginationResult<T> | void => {
          const http: HttpArgumentsHost = context.switchToHttp();

          if (items.length > 0) {
            const request: Request = http.getRequest();
            const {page, take: limit}: PaginationOptions<T> = PaginationFactory(null, request);
            const pages: number = total > 0 ? Math.ceil(total / limit) : 0;

            return {
              items,
              limit,
              page,
              pages,
              total
            };
          }

          const response: Response = http.getResponse();

          response.sendStatus(HttpStatus.NO_CONTENT);
        }
      )
    );
  }
}
