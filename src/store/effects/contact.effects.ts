import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContactService } from '../../services/contact.service';
import * as ContactActions from '../actions/contact.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private contactService: ContactService) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.loadContacts),
      mergeMap((action) =>
        this.contactService.getAllContacts(action.params).pipe(
          map((result) => ContactActions.loadContactsSuccess({ result })),
          catchError((error) => of(ContactActions.loadContactsFailure({ error })))
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.addContact),
      mergeMap((action) =>
        this.contactService.addContact(action.contact).pipe(
          map((contact) => ContactActions.addContactSuccess({ contact })),
          catchError((error) => of(ContactActions.addContactFailure({ error })))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.updateContact),
      mergeMap((action) =>
        this.contactService.updateContact(action.contact).pipe(
          map((contact) => ContactActions.updateContactSuccess({ contact })),
          catchError((error) => of(ContactActions.updateContactFailure({ error })))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.deleteContact),
      mergeMap((action) =>
        this.contactService.deleteContact(action.id).pipe(
          map(() => ContactActions.deleteContactSuccess({ id: action.id })),
          catchError((error) => of(ContactActions.deleteContactFailure({ error })))
        )
      )
    )
  );
}
