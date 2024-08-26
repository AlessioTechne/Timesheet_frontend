import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pm-project-expand',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeathericonsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './pm-project-expand.component.html',
  styleUrl: './pm-project-expand.component.scss',
})
export class PmProjectExpandComponent implements OnInit {
  @Input() data: any;
  displayColumns: string[] = [
    'projectLeader',
    'customerReference',
    'totEstimatedEffortInDays',
    'totTaskLoggedDays',
    'totNotBudgetedTaskLoggedDays',
  ];
  form:FormGroup;

  constructor(private fb : FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      projectLeader: [this.data.projectLeader],
      customerReference: [this.data.customerReference],
      totEstimatedEffortInDays: [this.data.totEstimatedEffortInDays],
      totTaskLoggedDays: [this.data.totTaskLoggedDays],
      totNotBudgetedTaskLoggedDays: [this.data.totNotBudgetedTaskLoggedDays],
    });
  }
}
