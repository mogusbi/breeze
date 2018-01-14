import {ArgumentMetadata, HttpException, HttpStatus, Pipe, PipeTransform} from '@nestjs/common';
import {validate, ValidationError} from 'class-validator';
import {ClassTransformOptions, plainToClass} from 'class-transformer';
import {status} from 'shared/status';

@Pipe()
export class ValidationPipe implements PipeTransform<string> {
  public async transform(value: string, {metatype}: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object: ClassTransformOptions = plainToClass(metatype, value);
    const errors: ValidationError[] = await validate(object);

    // TODO: Iterate errors and return them in response
    if (errors.length > 0) {
      throw new HttpException(status.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.find(
      (type) => metatype === type
    );
  }
}
