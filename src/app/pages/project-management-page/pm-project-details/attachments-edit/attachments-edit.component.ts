import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { DialogMembersComponent } from '../dialog-members/dialog-members.component';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attachments-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FeathericonsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './attachments-edit.component.html',
  styleUrl: './attachments-edit.component.scss',
})
export class AttachmentsEditComponent implements OnInit {
  name = '';
  form: FormGroup;

  multiple = false;

  constructor(
    public dialogRef: MatDialogRef<DialogMembersComponent>,
    private fb: FormBuilder
  ) {
    //if (name) this.name = name;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      attachName: ['', [Validators.required]],
      fileUpload: [null, [Validators.required]],
    });

    /*.form.patchValue({
      attachName: this.name,
    });*/
  }

  onSave() {
    const file = this.form.get('fileUpload')?.value[0];
    const attachName = this.form.get('attachName')?.value;
    this.dialogRef.close({ data: [attachName, file] });
  }
  onClose() {
    this.dialogRef.close();
  }
}
