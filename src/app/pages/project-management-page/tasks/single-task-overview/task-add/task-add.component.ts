import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { FeatherModule } from 'angular-feather';
import { FeathericonsComponent } from '../../../../../icons/feathericons/feathericons.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TextInputComponent } from '../../../../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInput,
    ReactiveFormsModule,
    FeathericonsComponent,
    FeatherModule,
    MatFormFieldModule,
    MatLabel,
    TextInputComponent,
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss',
})
export class TaskAddComponent implements OnInit {
  pageTitle = '';
  taskLogForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  onCancel() {}

  onSubmit() {}
}
