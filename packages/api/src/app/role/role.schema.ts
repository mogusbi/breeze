import {Schema} from 'mongoose';

export const RoleSchema: Schema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true
  },
  protect: {
    default: false,
    type: Boolean
  }
});
