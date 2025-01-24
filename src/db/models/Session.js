import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hook.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntill: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntill: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', handleSaveError);
sessionSchema.post('findOneAndUpdate', handleSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateSettings);

const SessionCollection = model('session', sessionSchema);
export default SessionCollection;
