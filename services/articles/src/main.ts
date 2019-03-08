/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {bootstrap} from '@breezejs/bootstrap';
import {AppModule} from './app';

bootstrap(AppModule, 3010).catch(
  (err: Error): void => {
    console.error(err.message);
  }
);
