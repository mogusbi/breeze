import {HttpException, HttpStatus} from '@nestjs/common';
import {createHttpExceptionBody} from '@nestjs/common/utils/http-exception-body.util';
import {status} from 'shared/status';

export class NoContentException extends HttpException {
  constructor (
    message?: string | object,
    error: string = status.NO_CONTENT
  ) {
    super(
      createHttpExceptionBody(message, error, HttpStatus.NO_CONTENT),
      HttpStatus.NO_CONTENT
    );
  }
}
