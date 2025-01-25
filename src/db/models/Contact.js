import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from './hook.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      required: true,
      enum: typeList,
      default: 'personal',
    },
    photo: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);
contactSchema.post('findOneAndUpdate', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);

export const sortByList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
