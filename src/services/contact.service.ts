import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://localhost:7246/api/Contacts';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllContacts(params?: any): Observable<{ totalCount: number; items: Contact[] }> {
    let queryParams = new HttpParams();
    if (params) {
      queryParams = queryParams.append('page', params.page);
      queryParams = queryParams.append('pageSize', params.pageSize);
      queryParams = queryParams.append('sortField', params.sortField);
      queryParams = queryParams.append('sortOrder', params.sortOrder);
      queryParams = queryParams.append('search', params.search);
    }
    return this.http
      .get<{ totalCount: number; items: Contact[] }>(this.apiUrl, { params: queryParams })
      .pipe(catchError(this.handleError));
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.apiUrl, contact, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http
      .put<Contact>(`${this.apiUrl}/${contact.id}`, contact, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteContact(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
