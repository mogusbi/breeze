import {IConfig} from './config.interface';

// TODO: Use parameter store
export const production: IConfig = {
  database: {
    connectionString: 'mongodb://localhost/breeze-bb'
  },
  pagination: {
    max: 100,
    min: 5,
    size: 10
  }
};
