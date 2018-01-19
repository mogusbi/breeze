import {Schema} from 'mongoose';
import * as paginate from 'mongoose-paginate';

const PermissionSchema: Schema = new Schema(
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

PermissionSchema.plugin(paginate);

export {PermissionSchema};
