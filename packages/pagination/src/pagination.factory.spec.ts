/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-any
import {PaginationFactory} from './pagination.factory';

describe('PaginationFactory', (): void => {
  it('should convert string inputs into number', (): void => {
    const request: any = {
      query: {
        limit: '30',
        page: '3'
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      skip: 60,
      take: 30
    });
  });

  it('should default to page 1', (): void => {
    const request: any = {
      query: {
        limit: 20
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      skip: 0,
      take: 20
    });
  });

  it('should use default size if not set', (): void => {
    const request: any = {
      query: {
        page: 3
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      skip: 20,
      take: 10
    });
  });

  it('should use max limit if limit is too high', (): void => {
    const request: any = {
      query: {
        limit: 90,
        page: 3
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      skip: 100,
      take: 50
    });
  });

  it('should use min limit if limit is too low', (): void => {
    const request: any = {
      query: {
        limit: 1,
        page: 3
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      skip: 10,
      take: 5
    });
  });
});
