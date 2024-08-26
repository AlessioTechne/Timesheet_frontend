import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectParams, ProjectsDto } from '../../../../_models/project';
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
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Pagination } from '../../../../_models/pagination';
import { PmProjectExpandComponent } from '../pm-project-expand/pm-project-expand.component';
import { ProjectManagementService } from '../../../../_services/project-management.service';
import { RouterLink } from '@angular/router';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-pm-project-view',
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
    PmProjectExpandComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }],
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
  templateUrl: './pm-project-view.component.html',
  styleUrl: './pm-project-view.component.scss',
})
export class PmProjectViewComponent implements OnInit {
 
  @Input() status = '';
  projectParams: ProjectParams | undefined;
  pagination: Pagination | undefined;
  project: ProjectsDto[];
  dataSource: MatTableDataSource<ProjectsDto, MatPaginator>;
  filtersForm: FormGroup;
  expandedElement: ProjectsDto | null;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'projectCode',
    'projectName',
    'completion',
    'budget',
    'customerName',
    'statusName',
    'dueDate',
    'action',
  ];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];

  displayedColumnsUnderExpand: string[] = [
    'projectLeader',
    'customerReference',
    'totEstimatedEffortInDays',
    'totTaskLoggedDays',
    'totNotBudgetedTaskLoggedDays',
  ];

  expandedDataSource: ProjectsDto[];

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
  }

  

  initializeFilterForms() {
    this.filtersForm = this.fb.group({
      projectCode: [this.projectParams?.projectCode],
      projectName: [this.projectParams?.projectName],
      customerName: [this.projectParams?.customerName],
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
        this.projectParams.customerName =
          values.customerName === null ? '' : values.customerName;
        

        this.projectServices.setProjectParams(this.projectParams);
        this.loadProject();
      }
    });
  }

  loadProject() {
    if (this.projectParams) {
      this.projectParams.statusId = this.status;
      this.projectServices.setProjectParams(this.projectParams);
      this.projectServices.paginatedProject(this.projectParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.project = response.result;
            this.dataSource = new MatTableDataSource(this.project);
            this.pagination = response.pagination;
            this.dataSource.sort = this.sort;
          }
        },
      });
    }
  }

  pageChanged(event: any) {
    if (this.projectParams && this.projectParams?.pageNumber !== event.page) {
      this.projectParams.pageNumber = event.pageIndex;
      this.projectParams.pageSize = event.pageSize;
      this.projectServices.setProjectParams(this.projectParams);
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
