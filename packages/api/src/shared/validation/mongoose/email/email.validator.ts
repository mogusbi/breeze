import {isEmail} from 'validator';
import {IValidator} from '../validator.interface';

export const emailValidator: IValidator = {
  message: 'Invalid email address',
  validator (value: string): boolean {
    return isEmail(value);
  }
};
