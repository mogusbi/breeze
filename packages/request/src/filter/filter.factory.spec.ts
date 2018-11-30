/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-any
import {FilterFactory} from './filter.factory';

describe('FilterFactory', (): void => {
  it('should convert comma separated filter value into an array', (): void => {
    const request: any = {
      query: {
        fields: 'id,name,createdAt'
      }
    };

    expect(FilterFactory(null, request)).toEqual({
      relations: [],
      select: [
        'id',
        'name',
        'createdAt'
      ]
    });
  });

  it('should default to null if no value is set', (): void => {
    const request: any = {
      query: {
        sort: 'DESC'
      }
    };

    expect(FilterFactory(null, request)).toEqual({
      relations: [],
      select: null
    });
  });

  it('should pick out related fields and add them to relations', (): void => {
    const request: any = {
      query: {
        fields: 'id,name,createdAt,related.id,related.name'
      }
    };

    expect(FilterFactory(null, request)).toEqual({
      relations: [
        'related.id',
        'related.name'
      ],
      select: [
        'id',
        'name',
        'createdAt'
      ]
    });
  });

  it('should default to null if only related fields are set', (): void => {
    const request: any = {
      query: {
        fields: 'related.id,related.name'
      }
    };

    expect(FilterFactory(null, request)).toEqual({
      relations: [
        'related.id',
        'related.name'
      ],
      select: null
    });
  });
});
