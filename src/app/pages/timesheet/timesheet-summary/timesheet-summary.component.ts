import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { EmployeesService } from '../../../_services/employees.service';
import { FeatherModule } from 'angular-feather';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { TimesheetDialogComponent } from '../timesheet-dialog/timesheet-dialog.component';
import { TimesheetService } from '../../../_services/timesheet.service';
import localeIt from '@angular/common/locales/it';
import { CustomDateAdapter } from '../../../_forms/dateAdapter';
import { TaskService } from '../../../_services/task.service';
import { TaskLogsDto, TaskLogsEditDto } from '../../../_models/project';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-timesheet-summary',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    FeatherModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' }, // Configura la regione
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Usa il Custom Date Adapter
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }, // Configura la localizzazione della data
    DatePipe,
  ],
  templateUrl: './timesheet-summary.component.html',
  styleUrls: ['./timesheet-summary.component.scss'],
})
export class TimesheetSummaryComponent implements OnInit {
  dataSource = new MatTableDataSource<TaskLogsDto>();
  totalWorkHours = 0;
  minHours = 0;
  maxHours = 0;
  minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  maxDate = new Date();
  isDisabled = true;
  dateForm: FormGroup;

  displayedColumns = [
    'taskName',
    'actualWorkInHours',
    'taskLogName',
    'taskLogNote',
    'actions',
  ];

  constructor(
    private employeeServices: EmployeesService,
    private timesheetServices: TimesheetService,
    private taskService: TaskService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}

  ngOnInit(): void {
    this._locale = 'it';
    this._adapter.setLocale(this._locale);
    this.initializeFilterForms();
    this.loadTimesheet();
    this.dateForm.valueChanges.subscribe(() => {
      this.timesheetServices.clearData();
      this.loadTimesheet();
    });
    this.timesheetServices.currentData$.subscribe((data) => {
      this.totalWorkHours = 0;
      data.forEach((element) => {
        this.totalWorkHours += element.actualWorkInHours;
      });
      if( this.totalWorkHours < this.minHours || this.totalWorkHours > this.maxHours) {
        this.isDisabled = true;
      } else { 
        this.isDisabled = false;
      }
      this.dataSource.data = data;
    });
  }

  initializeFilterForms() {
    this.dateForm = this.fb.group({
      date: [new Date(), [Validators.required]],
    });
  }

  loadTimesheet() {
    const date = this.dateForm.get('date')?.value;
    const dateToSend = this.datePipe.transform(date, 'yyyy-MM-dd');
    const dayOfWeek = date.getDay();
    this.employeeServices.getTimetable(dayOfWeek).subscribe((data) => {
      if (!data) {
        this.minHours = 0;
        this.maxHours = 0;
        this.isDisabled = true;
      }
      this.minHours = data.minHours;
      this.maxHours = data.maxHours;
      this.isDisabled = false;
    });
    if (!dateToSend) return;
    this.taskService.getTaskLogs(dateToSend).subscribe((data) => {
      this.timesheetServices.setData(data);
    });
  }

  saveTimeLogs() {
    const date = this.dateForm.get('date')?.value;
    const dateToSend = this.datePipe.transform(date, 'yyyy-MM-dd');
    const timesheet = this.timesheetServices.getTaskLogsDto();

    var taskLogsEditDto: TaskLogsEditDto[] = [];
    timesheet.forEach((element: TaskLogsDto) => {
      var elem: TaskLogsEditDto = {
        taskId: element.taskId,
        taskLogId: element.taskLogId,
        taskLogDate: dateToSend!,
        taskLogNote: element.taskLogNote,
        actualWorkInHours: element.actualWorkInHours,
        taskLogName: element.taskLogName,
      };

      taskLogsEditDto.push(elem);
    });

    this.taskService.saveTaskLogs(taskLogsEditDto).subscribe(() => {
      this.timesheetServices.clearData();
      this.loadTimesheet();
    });
  }

  deleteTimesheet(task: TaskLogsDto) {
    this.timesheetServices.deleteData(task.taskId);
  }

  editTimesheet(task: TaskLogsDto) {
    this.openDialog(task);
  }

  openDialog(task: TaskLogsDto) {
    const dialogRef = this.dialog.open(TimesheetDialogComponent, {
      data: {
        name: task.taskName,
        actualWorkInHours: task.actualWorkInHours,
        taskLogName: task.taskLogName,
        taskLogNote: task.taskLogNote,
        hasLogsAsSubtasks: task.taskLogName == null,
      },
    });

    return dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      var data: TaskLogsDto = {
        taskLogId: task.taskLogId,
        taskId: task.taskId,
        taskName: task.taskName,
        taskLogDate: result.taskLogDate,
        taskLogNote: result.data[2],
        actualWorkInHours: result.data[0],
        taskLogName: result.data[1],
      };
      this.timesheetServices.updateData(task.taskId, data);
    });
  }
}
