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
      select: [
        'id',
        'name',
        'createdAt'
      ]
    });
  });

  it('should default to null if not value is set', (): void => {
    const request: any = {
      query: {
        sort: 'DESC'
      }
    };

    expect(FilterFactory(null, request)).toEqual({
      select: null
    });
  });
});
