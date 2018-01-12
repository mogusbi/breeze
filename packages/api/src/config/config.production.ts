import {IConfig} from './config.interface';

export const production: IConfig = {
  database: {
    connectionString: 'mongodb://localhost/breeze-bb'
  }
};
