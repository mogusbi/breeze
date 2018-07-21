import {regex} from 'shared/regex';
import {IValidator} from '../validator.interface';

export const passwordValidator: IValidator = {
  message: 'Invalid password',
  validator (value: string): boolean {
    return regex.password.test(value);
  }
};
