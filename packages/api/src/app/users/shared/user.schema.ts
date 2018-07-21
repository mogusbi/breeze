import {Schema} from 'mongoose';
import * as paginate from 'mongoose-paginate';
import {encryptionService} from 'shared/encryption';
import {emailValidator, passwordValidator} from 'shared/validation/mongoose';
// import {IUser} from './user.interface';

// TODO: Security questions
// TODO: Password and answer hashing
// TODO: Password confirm
// TODO: Salt
const UserSchema: Schema = new Schema(
  {
    emailAddress: {
      required: [
        true,
        'Email address is required'
      ],
      type: String,
      unique: true,
      validate: emailValidator
    },
    firstName: {
      required: [
        true,
        'First name is required'
      ],
      type: String
    },
    password: {
      required: [
        true,
        'Password is required'
      ],
      type: String,
      validate: passwordValidator
    },
    surname: {
      required: [
        true,
        'Surname is required'
      ],
      type: String
    },
    username: {
      required: [
        true,
        'Username is required'
      ],
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(paginate);

UserSchema.pre('save', async (next: Function) => {
  // const user: IUser = this;

  if (!this.isModified('password')) {
    return next();
  }

  await encryptionService
});

export {UserSchema};
