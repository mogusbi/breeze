import {IConfig} from './config.interface';

export const development: IConfig = {
  database: {
    connectionString: 'mongodb://localhost/breeze-bb'
  },
  pagination: {
    max: 100,
    min: 5,
    size: 10
  }
};
