// tslint:disable no-console
/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {bootstrap} from '@breezejs/bootstrap';
import {AppModule} from './app';

bootstrap(AppModule, 3000).catch((err: Error): void => {
  console.error(err.message);
});
