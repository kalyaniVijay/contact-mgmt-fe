import { createReducer, on } from '@ngrx/store';
import * as ContactActions from '../actions/contact.actions';
import { Contact } from '../../models/contact';

export interface ContactState {
  contacts: Contact[];
  totalCount: number;
  error: string | null;
}

export const initialState: ContactState = {
  contacts: [],
  totalCount: 0,
  error: null,
};

export const contactReducer = createReducer(
  initialState,
  on(ContactActions.loadContactsSuccess, (state, { result }) => ({
    ...state,
    contacts: result.items,
    totalCount: result.totalCount,
    error: null,
  })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    contacts: [],
    totalCount: 0,
    error: error,
  })),
  on(ContactActions.addContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    totalCount: state.totalCount + 1,
    error: null,
  })),
  on(ContactActions.addContactFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(ContactActions.updateContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map((c) => (c.id === contact.id ? contact : c)),
    error: null,
  })),
  on(ContactActions.updateContactFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(ContactActions.deleteContactSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter((c) => c.id !== id),
    totalCount: state.totalCount - 1,
    error: null,
  })),
  on(ContactActions.deleteContactFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

// Ensure the ContactState and the reducer are exported correctly
export const reducer = contactReducer;
