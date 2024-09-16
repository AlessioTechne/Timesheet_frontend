import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ProjectMembersTimesheetDto,
  ProjectParams,
  ProjectStatusDto,
} from '../../../_models/project';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { FeatherModule } from 'angular-feather';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MyProjectExpandComponent } from '../my-project-expand/my-project-expand.component';
import { Pagination } from '../../../_models/pagination';
import { ProjectManagementService } from '../../../_services/project-management.service';
import { RouterLink } from '@angular/router';
import { TimesheetSummaryComponent } from '../timesheet-summary/timesheet-summary.component';

@Component({
  selector: 'app-my-project',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatIcon,
    MatSortModule,
    MatInputModule,
    FeatherModule,
    FormsModule,
    ReactiveFormsModule,
    MyProjectExpandComponent,
    MatOptionModule,
    MatSelectModule,
    TimesheetSummaryComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './my-project.component.html',
  styleUrl: './my-project.component.scss',
})
export class MyProjectComponent implements OnInit {
  status = '';
  projectParams: ProjectParams | undefined;
  pagination: Pagination | undefined;
  project: ProjectMembersTimesheetDto[];
  projectStatusDto: ProjectStatusDto[];
  dataSource = new MatTableDataSource<ProjectMembersTimesheetDto>();
  filtersForm: FormGroup;
  expandedElement: ProjectMembersTimesheetDto | null;
  expandedDataSource: ProjectMembersTimesheetDto[];

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'projectCode',
    'projectName',
    'dueDate',
    'action',
  ];
  displayedColumnsTimesheets = [
    'taskName',
    'taskLogDate',
    'actualWorkInHours',
    'taskLogName',
    'actions',
  ];

  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];

  displayedColumnsUnderExpand: string[] = [
    'projectLeader',
    'customerReference',
    'totEstimatedEffortInDays',
    'totTaskLoggedDays',
    'totNotBudgetedTaskLoggedDays',
  ];

  constructor(
    private projectServices: ProjectManagementService,
    private fb: FormBuilder
  ) {
    this.projectParams = this.projectServices.getProjectParams();
  }

  ngOnInit(): void {
    this.initializeFilterForms();
    if (this.projectParams) {
      this.projectParams.statusId = this.status;
    }
    this.loadProject();
    //this.getStatus();
  }

  initializeFilterForms() {
    this.filtersForm = this.fb.group({
      projectCode: [this.projectParams?.projectCode],
      projectName: [this.projectParams?.projectName],
    });
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        if (this.projectParams) {
          this.projectParams.orderBy = sort.active;
          this.projectParams.orderDirection = sort.direction;
          this.loadProject();
        }
      });
    }
    this.filtersForm.valueChanges.subscribe((values) => {
      if (this.projectParams) {
        this.projectParams.projectName =
          values.projectName === null ? '' : values.projectName;
        this.projectParams.projectCode =
          values.projectCode === null ? '' : values.projectCode;

        //this.projectParams.statusId =
        //values.statusId === null ? '' : values.statusId;
        this.loadProject();
      }
    });
  }

  loadProject() {
    if (this.projectParams) {
      this.projectServices.getMyPaginatedProject(this.projectParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.project = response.result;
            this.dataSource.data = this.project;
            this.pagination = response.pagination;
            this.dataSource.sort = this.sort;
          }
        },
      });
    }
  }

  getStatus() {
    this.projectServices.getProjectStatus().subscribe({
      next: (response) => {
        if (response) {
          this.projectStatusDto = response;
        }
      },
    });
  }

  pageChanged(event: any) {
    if (this.projectParams && this.projectParams?.pageNumber !== event.page) {
      this.projectParams.pageNumber = event.pageIndex;
      this.projectParams.pageSize = event.pageSize;
      this.loadProject();
    }
  }

  toggleRow(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.expandedDataSource = this.expandedElement
      ? [this.expandedElement]
      : [];
  }

  resetFilters() {
    this.filtersForm.reset();
  }
}
