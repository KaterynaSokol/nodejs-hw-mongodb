import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
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
    enum: ['work', 'home', 'personal'],
    default: 'personal',
  },
});

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;