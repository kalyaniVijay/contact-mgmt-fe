import * as fromContact from './reducers/contact.reducer';

export interface AppState {
  contacts: fromContact.State;
}
