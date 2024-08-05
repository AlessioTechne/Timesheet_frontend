import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  TaskEmployeesDto,
  TaskOverviewDto,
  TaskParams,
} from '../../../../_models/projectTask';

import { FeatherModule } from 'angular-feather';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { Pagination } from '../../../../_models/pagination';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../../_services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMembersComponent } from '../dialog-members/dialog-members.component';
import { EmployeesDto } from '../../../../_models/employees';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatIcon,
    CommonModule,
    MatLabel,
    FeatherModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss',
})
export class TaskOverviewComponent implements OnInit {
  @Input() projectId: number;
  projectTasks: any;
  taskParams: TaskParams | undefined;
  pagination: Pagination | undefined;
  tasks: TaskOverviewDto[];
  dataSource: MatTableDataSource<TaskOverviewDto, MatPaginator>;
  filtersForm: FormGroup;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    //'taskNumber',
    'taskName',
    'estimatedEffortInDays',
    'TaskLoggedDaysByBudget',
    'delta',
    'TaskLoggedDaysOutOfBudget',
    'actualStartDate',
    'actualEndDate',
    'actions',
  ];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,
    public dialog: MatDialog,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}

  ngOnInit(): void {
    this._locale = 'it';
    this._adapter.setLocale(this._locale);
    this.initializeFilterForms();
    this.taskParams = this.taskService.getTaskParams();
    if (this.taskParams) {
      this.taskParams.projectId = this.projectId;
      this.loadTasks();
    }
  }

  initializeFilterForms() {
    this.filtersForm = this.fb.group({
      taskName: [this.taskParams?.taskName],
      actualStartDate: [this.taskParams?.actualStartDate],
      actualEndDate: [this.taskParams?.actualEndDate],
    });
  }

  loadTasks() {
    if (this.taskParams) {
      this.taskService.paginatedTasks(this.taskParams).subscribe({
        next: (response) => {
          this.projectTasks = response.result;
          this.dataSource = new MatTableDataSource(this.projectTasks);
          this.pagination = response.pagination;
        },
      });
    }
  }

  ngAfterViewInit() {
    this.filtersForm.valueChanges.subscribe((values) => {
      if (this.taskParams) {
        this.taskParams.taskName =
          values.taskName === null ? '' : values.taskName;
        this.taskParams.actualStartDate =
          values.actualStartDate === null
            ? ''
            : this.datePipe.transform(values.actualStartDate, 'yyyy-MM-dd');
        this.taskParams.actualEndDate =
          values.actualEndDate === null
            ? ''
            : this.datePipe.transform(values.actualEndDate, 'yyyy-MM-dd');

        this.loadTasks();
      }
    });
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        if (this.taskParams) {
          this.taskParams.orderBy = sort.active;
          this.taskParams.orderDirection = sort.direction;
          this.loadTasks();
        }
      });
    }
  }

  pageChanged(event: any) {
    if (this.taskParams && this.taskParams?.pageNumber !== event.page) {
      this.taskParams.pageNumber = event.pageIndex;
      this.taskParams.pageSize = event.pageSize;
      this.loadTasks();
    }
  }

  resetFilters() {
    this.filtersForm.reset();
  }

  openDialog(taskid: number) {
    this.taskService.getProjectTeamMatrix(this.projectId, taskid).subscribe({
      next: (response) => {
        const dialogRef = this.dialog.open(DialogMembersComponent, {
          data: { employees: response, saveAll: true },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (!result) {
            return;
          }
          var assignTaskDto: TaskEmployeesDto = {
            projectId: this.projectId,
            taskId: taskid,
            employees: result.data,
          };

          console.log(result)
          if (result.all) {
            this.taskService.setAssignAllTask(assignTaskDto).subscribe({
              next: () => {
                this.loadTasks();
              },
            });
          } else {
            this.taskService.setAssignTask(assignTaskDto).subscribe({
              next: () => {
                this.loadTasks();
              },
            });
          }
        });
      },
    });
  }
}
