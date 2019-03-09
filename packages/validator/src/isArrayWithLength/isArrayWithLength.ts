/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-any
import {registerDecorator, ValidationOptions} from 'class-validator';

export function IsArrayWithLength (min: number = 1, validationOptions?: ValidationOptions): Function {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      constraints: [
        min
      ],
      name: 'IsArrayWithLength',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        validate (value: any): boolean {
          return value instanceof Array && value.length >= min;
        }
      }
    });
  };
}
