import {HttpStatus} from '@nestjs/common';
import {status} from 'shared/status';
import {ISwagger, ISwaggerProp} from './swagger.interface';

export const swagger: ISwagger = {
  BAD_REQUEST: {
    description: status.BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST
  },
  CREATED: {
    description: status.CREATED,
    status: HttpStatus.CREATED
  },
  FORBIDDEN: {
    description: status.FORBIDDEN,
    status: HttpStatus.FORBIDDEN
  },
  NO_CONTENT: {
    description: status.NO_CONTENT,
    status: HttpStatus.NO_CONTENT
  },
  NOT_FOUND: {
    description: status.NOT_FOUND,
    status: HttpStatus.NOT_FOUND
  },
  OK: {
    description: status.OK,
    status: HttpStatus.OK
  },
  UNAUTHORISED: {
    description: status.UNAUTHORISED,
    status: HttpStatus.UNAUTHORIZED
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

