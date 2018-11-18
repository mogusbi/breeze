/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {createParamDecorator} from '@nestjs/common';
import {FilterFactory} from './filter.factory';

export const Filter: Function = createParamDecorator(FilterFactory);
