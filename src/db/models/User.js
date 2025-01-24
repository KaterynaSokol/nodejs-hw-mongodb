import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hook.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);

const UserCollection = model('user', userSchema);
export default UserCollection;
