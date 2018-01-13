import {ISwagger, ISwaggerProp} from './swagger.interface';

export const swagger: ISwagger = {
  CREATED: {
    description: 'Created',
    status: 201
  },
  FORBIDDEN: {
    description: 'Forbidden',
    status: 403
  },
  NOCONTENT: {
    description: 'No content',
    status: 204
  },
  NOTFOUND: {
    description: 'Not found',
    status: 404
  },
  OK: {
    description: 'Successful operation',
    status: 200
  },
  UNAUTHORISED: {
    description: 'Unauthorised',
    status: 401
  }
};

export function swaggerWithType<T> (
  prop: ISwaggerProp,
  type: T,
  isArray: boolean = false
) {
  return {
    ...prop,
    isArray,
    type
  }
}

