/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {bootstrap} from '@breezejs/bootstrap';
import {AppModule} from './app';

try {
  void bootstrap(AppModule, 3000);
} catch (e) {
  throw e;
}
