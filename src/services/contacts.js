import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => {
  ContactCollection.find();
};

export const getContactByID = (id) => ContactCollection.findById(id);
