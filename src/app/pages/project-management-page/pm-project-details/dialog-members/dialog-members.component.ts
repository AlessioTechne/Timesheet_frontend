import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ProjectTeamMatrixDto } from '../../../../_models/projectTask';
import { DialogData } from '../../../../ui-elements/dialog/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-dialog-members',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-members.component.html',
  styleUrl: './dialog-members.component.scss',
})
export class DialogMembersComponent implements OnInit {
  employees: ProjectTeamMatrixDto[] = [];
  selectedData: ProjectTeamMatrixDto[] | undefined = [];
  saveAll: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogMembersComponent>,
    @Inject(MAT_DIALOG_DATA) data: {saveAll:boolean, employees: ProjectTeamMatrixDto[]},
  ) {
    this.employees = data.employees;
    this.saveAll = data.saveAll;
    this.selectedData = this.employees.filter((x) => x.isMember === true);
  }

  ngOnInit(): void {}

  onSave() {
    this.dialogRef.close({ all: false, data: this.selectedData });
  }

  onSaveAll() {
    this.dialogRef.close({ all: true, data: this.selectedData });
  }

  onClose() {
    this.dialogRef.close();
  }
}
