import {ArgumentMetadata, HttpException, HttpStatus, Pipe, PipeTransform} from '@nestjs/common';
import {ClassTransformOptions, plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {status} from 'shared/status';

@Pipe()
export class ValidationPipe implements PipeTransform<string> {
  public async transform (value: string, {metatype}: ArgumentMetadata): Promise<string> {
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

  private toValidate (metatype: Function): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];

    return !types.find(
      (type) => metatype === type
    );
  }
}
