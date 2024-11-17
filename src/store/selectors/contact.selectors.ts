import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from '../reducers/contact.reducer';

export const selectContactState = createFeatureSelector<ContactState>('contacts');


export const selectPagedContacts = createSelector(
  selectContactState,
  (state) => ({
    totalCount: state.totalCount,
    items: state.contacts
  })
);
