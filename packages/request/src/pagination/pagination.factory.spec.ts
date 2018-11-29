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
      order: {},
      page: 3,
      relations: [],
      select: null,
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
      order: {},
      page: 1,
      relations: [],
      select: null,
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
      order: {},
      page: 3,
      relations: [],
      select: null,
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
      order: {},
      page: 3,
      relations: [],
      select: null,
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
      order: {},
      page: 3,
      relations: [],
      select: null,
      skip: 10,
      take: 5
    });
  });

  it('should convert comma separated filter value into an array', (): void => {
    const request: any = {
      query: {
        fields: 'id,name,createdAt,relation.id'
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      order: {},
      page: 1,
      relations: [
        'relation.id'
      ],
      select: [
        'id',
        'name',
        'createdAt'
      ],
      skip: 0,
      take: 10
    });
  });

  it('should default the order direction when the sort param is set', (): void => {
    const request: any = {
      query: {
        sort: 'name'
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      order: {
        name: 'ASC'
      },
      page: 1,
      relations: [],
      select: null,
      skip: 0,
      take: 10
    });
  });

  it('should default the order direction if invalid sort is set', (): void => {
    const request: any = {
      query: {
        dir: 'sideways',
        sort: 'name'
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      order: {
        name: 'ASC'
      },
      page: 1,
      relations: [],
      select: null,
      skip: 0,
      take: 10
    });
  });

  it('should set the order as ASC', (): void => {
    const request: any = {
      query: {
        dir: 'asc',
        sort: 'name'
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      order: {
        name: 'ASC'
      },
      page: 1,
      relations: [],
      select: null,
      skip: 0,
      take: 10
    });
  });

  it('should set the order as DESC', (): void => {
    const request: any = {
      query: {
        dir: 'desc',
        sort: 'name'
      }
    };

    expect(PaginationFactory(null, request)).toEqual({
      order: {
        name: 'DESC'
      },
      page: 1,
      relations: [],
      select: null,
      skip: 0,
      take: 10
    });
  });
});
