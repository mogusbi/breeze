import {development} from './config.development';
import {IConfig} from './config.interface';
import {production} from './config.production';
import {test} from './config.test';

let config: IConfig;

switch (process.env.NODE_ENV) {
case 'development':
  config = development;
  break;
case 'test':
  config = test;
  break;
default:
  config = production;
}

export default config;
