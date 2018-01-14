import {Schema} from 'mongoose';
import * as paginate from 'mongoose-paginate';

const RoleSchema: Schema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true
    },
    protect: {
      default: false,
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

RoleSchema.plugin(paginate);

export {RoleSchema};
