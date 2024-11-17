import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactEffects } from '../store/effects/contact.effects';
import * as fromContact from '../store/reducers/contact.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  declarations: [AppComponent, ContactComponent, ContactFormComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'contact-management-app' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ contacts: fromContact.contactReducer }),
    EffectsModule.forRoot([ContactEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
