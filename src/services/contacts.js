import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactsQuery = ContactCollection.find();
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactByID = (id) => ContactCollection.findById(id);

export const getContact = (filter) => ContactCollection.findOne(filter);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate(filter, payload, {
    upsert,
    includeResultMetadata: true,
  });
  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};
export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
