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
import { DialogMembersComponent } from '../../project-management-page/pm-project-details/dialog-members/dialog-members.component';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TextInputComponent } from '../../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-timesheet-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    TextInputComponent,
  ],
  templateUrl: './timesheet-dialog.component.html',
  styleUrl: './timesheet-dialog.component.scss',
})
export class TimesheetDialogComponent implements OnInit {
  form: FormGroup;
  taskName: string;
  actualWorkInHours = 0;
  taskLogName = '';
  taskLogNote = '';
  hasLogsAsSubtasks = false;

  constructor(
    public dialogRef: MatDialogRef<DialogMembersComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    data: {
      name: string;
      actualWorkInHours: number;
      taskLogName: string;
      taskLogNote: string;
      hasLogsAsSubtasks: boolean;
    }
  ) {
    this.taskName = data.name;
    this.actualWorkInHours = data.actualWorkInHours;
    this.taskLogNote = data.taskLogNote;
    this.taskLogName = data.taskLogName;
    this.hasLogsAsSubtasks = data.hasLogsAsSubtasks;
  }

  ngOnInit(): void {
    if (!this.hasLogsAsSubtasks) {
      this.form = this.fb.group({
        actualWorkInHours: [
          this.actualWorkInHours,
          [Validators.required, Validators.min(0)],
        ],
        taskLogNote: [this.taskLogNote],
        taskLogName: [this.taskLogName, [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        actualWorkInHours: [
          this.actualWorkInHours,
          [Validators.required, Validators.min(0)],
        ],
      });
    }
  }

  onSave() {
    console.log(this.form);
    const actualWorkInHours = this.form.get('actualWorkInHours')?.value;
    const taskLogName = this.form.get('taskLogName')?.value;
    const taskLogNote = this.form.get('taskLogNote')?.value;
    this.dialogRef.close({ data: [actualWorkInHours, taskLogName, taskLogNote] });
  }
  onClose() {
    this.dialogRef.close();
  }
}
