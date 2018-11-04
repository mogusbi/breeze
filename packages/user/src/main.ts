import {bootstrap} from '@breeze-bb/core';
import {AppModule} from './app';

try {
  void bootstrap(AppModule, 3000);
} catch (e) {
  throw e;
}
