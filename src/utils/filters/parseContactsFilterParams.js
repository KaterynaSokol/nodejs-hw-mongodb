import { typeList } from '../../constants/contacts.js';

const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) => typeList.includes(contactType);

  if (isType(contactType)) return contactType;
};

export const parseContactsFilterParams = (query) => {
  const { contactType } = query;

  const parsedType = parseType(contactType);

  return {
    contactType: parsedType,
  };
};
