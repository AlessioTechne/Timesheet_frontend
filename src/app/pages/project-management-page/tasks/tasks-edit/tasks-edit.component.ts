import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  TaskEditDto,
  TaskNewDto,
  TasksDto,
  WorkPackageTypesDto,
} from '../../../../_models/projectTask';

import { CheckboxComponent } from '../../../../ui-elements/checkbox/checkbox.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../../_services/task.service';
import { TextInputComponent } from '../../../../_forms/text-input/text-input.component';
import { NavigationService } from '../../../../_services/navigation.service';

@Component({
  selector: 'app-tasks-edit',
  standalone: true,
  imports: [
    MatCard,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FeathericonsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TextInputComponent,
    CheckboxComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatOptionModule,
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
  templateUrl: './tasks-edit.component.html',
  styleUrl: './tasks-edit.component.scss',
})
export class TasksEditComponent implements OnInit {
  taskForm: FormGroup;
  formSubmitted: boolean = false;
  pageTitle: string;
  taskDto: TasksDto;
  wptype: WorkPackageTypesDto[];

  taskId: number;
  projectId: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}

  ngOnInit(): void {
    this._locale = 'it';
    this._adapter.setLocale(this._locale);
    this.route.paramMap.subscribe((params) => {
      if (params.has('idProject')) {
        this.projectId = +params.get('idProject')!;
      }
      if (params.has('idTask')) {
        this.taskId = +params.get('idTask')!;
      }
    });
    this.initializeForm();
    this.loadWPTypes();
    this.loadTask();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      taskNumber: [0, [Validators.required]],
      taskName: ['', [Validators.required]],
      estimatedEffortInDays: [''],
      actualStartDate: [new Date(), [Validators.required]],
      actualEndDate: [new Date()],
      costCenter: [''],
      wpTypeId: [null, [Validators.required]],
    });
  }

  loadTask() {
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe({
        next: (task) => {
          this.taskDto = task;
          this.taskForm.patchValue({
            taskNumber: task.taskNumber,
            taskName: task.taskName,
            estimatedEffortInDays: task.estimatedEffortInDays,
            actualStartDate: task.actualStartDate,
            actualEndDate: task.actualEndDate,
            costCenter: task.costCenter,
            wpTypeId: this.wptype.find((x) => x.wpTypeId == task.wpTypeId),
          });
          this.pageTitle = 'Modifica Task';
        },
      });
    } else {
      this.pageTitle = 'Nuovo Task';
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.taskForm.valid) {
      if (this.taskId) {
        var taskEditDto: TaskEditDto = {
          taskId: this.taskId,
          taskNumber: this.taskForm.controls['taskNumber'].value,
          taskName: this.taskForm.controls['taskName'].value,
          estimatedEffortInDays:
            this.taskForm.controls['estimatedEffortInDays'].value ?? 0,
          actualStartDate: this.taskForm.controls['actualStartDate'].value,
          actualEndDate: this.taskForm.controls['actualEndDate'].value,
          hasBudget: this.taskForm.controls['estimatedEffortInDays'].value
            ? true
            : false,
          costCenter: this.taskForm.controls['costCenter'].value ?? '',
          wPTYpeId: this.taskForm.controls['wpTypeId'].value,
        };
        this.taskService.editTask(taskEditDto).subscribe({
          complete: () => {
            this.router.navigate([this.navigationService.getPreviousUrl()]);
            this._snackBar.open('Task modificato con successo', undefined, {
              duration: 3 * 1000,
            });
          },
        });
      } else {
        var taskNewDto: TaskNewDto = {
          projectId: this.projectId,
          taskNumber: this.taskForm.controls['taskNumber'].value,
          taskName: this.taskForm.controls['taskName'].value,
          estimatedEffortInDays:
            this.taskForm.controls['estimatedEffortInDays'].value ?? 0,
          actualStartDate: this.taskForm.controls['actualStartDate'].value,
          actualEndDate: this.taskForm.controls['actualEndDate'].value,
          hasBudget: this.taskForm.controls['estimatedEffortInDays'].value
            ? true
            : false,
          costCenter: this.taskForm.controls['costCenter'].value ?? '',
          wpTypeId: this.taskForm.controls['wpTypeId'].value,
        };
        this.taskService.createNewTask(taskNewDto).subscribe({
          complete: () => {
            this.router.navigate([this.navigationService.getPreviousUrl()]);
            this._snackBar.open('Task creato con successo', undefined, {
              duration: 3 * 1000,
            });
          },
        });
      }
    } else {
      this._snackBar.open('Attenzione form non valida!', 'Chiudi');
      this.formSubmitted = false;
    }
  }

  loadWPTypes() {
    this.taskService.getWPTypes().subscribe({
      next: (response) => {
        this.wptype = response;
      },
    });
  }

  onDelete() {
    throw new Error('Method not implemented.');
  }

  onCancel() {
    this.router.navigate([this.navigationService.getPreviousUrl()]);
  }
}
