import {Document} from 'mongoose';

// TODO: Security questions
// TODO: Password and answer hashing
// TODO: Password confirm
// TODO: Salt
export interface IUser extends Document {
  emailAddress: string;
  firstName: string;
  password: string;
  surname: string;
  username: string;
}
