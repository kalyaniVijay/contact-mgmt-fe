import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '../../models/contact';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as fromContact from '../../store/reducers/contact.reducer';
import * as ContactActions from '../../store/actions/contact.actions';
import { selectPagedContacts } from '../../store/selectors/contact.selectors';

interface PagedResult<T> {
  totalCount: number;
  items: T[];
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'Edit',
    'Delete',
  ];
  dataSource = new MatTableDataSource<Contact>();
  contacts$!: Observable<Contact[]>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize = 2;
  pageIndex = 0;
  totalContacts = 0;
  sortField = 'id';
  sortOrder = 'asc';
  searchValue = '';
  showFirstLastButtons = true;
  isLoading = false;

  constructor(
    private store: Store<fromContact.ContactState>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf({ totalCount: 0, items: [] })));
        }),
        map((contactData: PagedResult<Contact>) => {
          console.log(contactData);
          this.totalContacts = 0;
          this.totalContacts = contactData.totalCount;
          this.isLoading = false;
          return contactData.items;
        })
      )
      .subscribe((contactData: Contact[]) => {
        this.dataSource.data = contactData;

      });
  }

  getTableData$(pageNumber: number, pageSize: number): Observable<PagedResult<Contact>> {
    this.store.dispatch(
      ContactActions.loadContacts({
        params: {
          page: pageNumber,
          pageSize: pageSize,
          sortField: this.sortField,
          sortOrder: this.sortOrder,
          search: this.searchValue,
        },
      })
    );
    return this.store.select(selectPagedContacts).pipe(
      catchError(() => observableOf({ totalCount: 0, items: [] }))
    );
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  handleSortEvent(sort: Sort) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction;
    this.loadContacts();
  }

  applyFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.loadContacts();
  }

  deleteContact(id: number) {
    this.store.dispatch(ContactActions.deleteContact({ id }));
    this.snackBar.open('Contact deleted successfully', 'Close', {
      duration: 3000,
    });
    this.loadContacts();
  }

  openForm(contact?: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '250px',
      data: contact || new Contact(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.store.dispatch(ContactActions.updateContact({ contact: result }));
          this.snackBar.open('Contact updated successfully', 'Close', {
            duration: 3000,
          });
        } else {
          this.store.dispatch(ContactActions.addContact({ contact: result }));
          this.snackBar.open('Contact added successfully', 'Close', {
            duration: 3000,
          });
        }
        this.loadContacts();
      }
    });
  }

  loadContacts() {
    this.store.dispatch(
      ContactActions.loadContacts({
        params: {
          page: this.pageIndex + 1,
          pageSize: this.pageSize,
          sortField: this.sortField,
          sortOrder: this.sortOrder,
          search: this.searchValue,
        },
      })
    );
  }
}
