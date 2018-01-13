import {IPagination} from './pagination.interface';

export const pagination: IPagination = {
  limit: {
    description: 'Size of the collection to be returned',
    name: 'limit',
    required: false,
    type: Number
  },
  page: {
    description: 'The required page number',
    name: 'page',
    required: false,
    type: Number
  }
};
