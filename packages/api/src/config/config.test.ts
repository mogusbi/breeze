import {IConfig} from './config.interface';

export const test: IConfig = {
  database: {
    connectionString: 'mongodb://localhost/breeze-bb'
  },
  pagination: {
    max: 100,
    min: 5,
    size: 10
  }
};
