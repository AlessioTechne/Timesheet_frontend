import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { TaskLogAddDto, TaskLogsEditDto } from '../../../../../_models/project';

import { BasicElementsComponent } from '../../../../../forms/basic-elements/basic-elements.component';
import { BasicFormComponent } from '../../../../../forms/basic-elements/basic-form/basic-form.component';
import { EmployeesDto } from '../../../../../_models/employees';
import { FeatherModule } from 'angular-feather';
import { FeathericonsModule } from '../../../../../icons/feathericons/feathericons.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NavigationService } from '../../../../../_services/navigation.service';
import { TaskService } from '../../../../../_services/task.service';
import { TextInputComponent } from '../../../../../_forms/text-input/text-input.component';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-task-log-add',
  standalone: true,
  imports: [
    FeathericonsModule,
    RouterLink,
    MatDividerModule,
    BasicFormComponent,
    BasicElementsComponent,
    CommonModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    FeatherModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    DatePipe,
    TextInputComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  providers: [
    DatePipe,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ],
  templateUrl: './task-log-add.component.html',
  styleUrl: './task-log-add.component.scss',
})
export class TaskLogAddComponent implements OnInit {
  taskId: number;
  pageTitle: any;
  taskLogForm: FormGroup;
  maxDate = new Date();

  employees: EmployeesDto[] = [];
  filteredEmployees: EmployeesDto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('taskId')) {
        this.taskId = +params.get('taskId')!;
      }
    });
    this.initializeForm();
    this.loadAssignedEmployees();
  }

  initializeForm() {
    this.taskLogForm = this.fb.group({
      taskLogName: ['', [Validators.required]],
      taskLogNote: ['', [Validators.required]],
      taskLogDate: [new Date(), [Validators.required]],
      actualWorkInHours: [0, [Validators.required, Validators.min(0)]],
      employee: ['', [Validators.required]],
    });
  }

  loadAssignedEmployees() {
    this.taskService.getAssignedEmployees(this.taskId).subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  employeesVal(): ((value: EmployeesDto) => string) | null {
    return (value: EmployeesDto) =>
      value ? value.firstName + ' ' + value.surname : '';
  }

  onCancel() {
    this.router.navigate([this.navigationService.getPreviousUrl()]);
  }

  onSubmit() {
    if (this.taskLogForm.valid) {
      console.log(this.taskLogForm.value);
      var elem: TaskLogAddDto = {
        taskId: this.taskId,
        employeeId: this.taskLogForm.controls['employee'].value.employeeId,
        taskLogName: this.taskLogForm.controls['taskLogName'].value,
        taskLogDate: this.taskLogForm.controls['taskLogDate'].value,
        taskLogNote: this.taskLogForm.controls['taskLogNote'].value,
        actualWorkInHours: this.taskLogForm.controls['actualWorkInHours'].value,
      };

      this.taskService.addTaskLog(elem).subscribe(() => {
        this.router.navigate([this.navigationService.getPreviousUrl()]);
      });
    }
  }
}
