/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {createParamDecorator} from '@nestjs/common';
import {PaginationFactory} from './pagination.factory';

export const Pagination: Function = createParamDecorator(PaginationFactory);
