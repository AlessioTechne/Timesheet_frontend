import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FeathericonsModule } from '../../../../../icons/feathericons/feathericons.module';
import { CustomDateAdapter } from '../../../../../_forms/dateAdapter';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-close-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FeathericonsModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' }, // Configura la regione
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }, // Configura la localizzazione della data
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './task-close-dialog.component.html',
  styleUrl: './task-close-dialog.component.scss',
})
export class TaskCloseDialogComponent implements OnInit {
  dateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskCloseDialogComponent>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) data: {},
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._locale = 'it';
    this._adapter.setLocale(this._locale);
    this.dateForm = this.fb.group({
      date: [new Date(), [Validators.required]],
    });

    console.log(this.dateForm);
  }

  onSave() {
    const date = this.dateForm.get('date')?.value;

    this.dialogRef.close({actualEndDate: date});
  }

  onClose() {
    this.dialogRef.close();
  }
}
