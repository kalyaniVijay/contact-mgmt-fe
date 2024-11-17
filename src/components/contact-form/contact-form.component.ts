import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      id: [data.id],
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.contactForm.valid) {
      this.dialogRef.close(this.contactForm.value);
    }
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
