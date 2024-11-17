import { createAction, props } from '@ngrx/store';
import { Contact } from '../../models/contact';

export const loadContacts = createAction(
  '[Contact List] Load Contacts',
  props<{ params: { page: number; pageSize: number; sortField: string; sortOrder: string; search: string } }>()
);

export const loadContactsSuccess = createAction(
  '[Contact List] Load Contacts Success',
  props<{ result: { totalCount: number; items: Contact[] } }>()
);

export const loadContactsFailure = createAction(
  '[Contact List] Load Contacts Failure',
  props<{ error: string }>()
);

export const addContact = createAction(
  '[Contact Form] Add Contact',
  props<{ contact: Contact }>()
);

export const addContactSuccess = createAction(
  '[Contact Form] Add Contact Success',
  props<{ contact: Contact }>()
);

export const addContactFailure = createAction(
  '[Contact Form] Add Contact Failure',
  props<{ error: string }>()
);

export const updateContact = createAction(
  '[Contact Form] Update Contact',
  props<{ contact: Contact }>()
);

export const updateContactSuccess = createAction(
  '[Contact Form] Update Contact Success',
  props<{ contact: Contact }>()
);

export const updateContactFailure = createAction(
  '[Contact Form] Update Contact Failure',
  props<{ error: string }>()
);

export const deleteContact = createAction(
  '[Contact List] Delete Contact',
  props<{ id: number }>()
);

export const deleteContactSuccess = createAction(
  '[Contact List] Delete Contact Success',
  props<{ id: number }>()
);

export const deleteContactFailure = createAction(
  '[Contact List] Delete Contact Failure',
  props<{ error: string }>()
);
