import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesDto, EmployeesParam } from '../../../_models/employees';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../_services/employees.service';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Pagination } from '../../../_models/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FeathericonsModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  templateUrl: './employees-management.component.html',
  styleUrl: './employees-management.component.scss',
})
export class EmployeesManagementComponent implements OnInit {
  employees: EmployeesDto[] = [];
  pagination: Pagination | undefined;
  employeesParams: EmployeesParam | undefined;
  dataSource: MatTableDataSource<EmployeesDto, MatPaginator>;
  filtersForm: FormGroup;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'surname',
    'firstName',
    'employeeSN',
    'account',
    'action',
  ];

  constructor(
    private employeesServices: EmployeesService,
    private fb: FormBuilder
  ) {
    this.employeesParams = employeesServices.getEmployeesParams();
  }

  ngOnInit(): void {
    this.loadEmployeers();
    this.initializeFilterForms();
  }

  initializeFilterForms() {
    this.filtersForm = this.fb.group({
      surname: [this.employeesParams?.surname],
      firstName: [this.employeesParams?.firstName],
      employeeSN: [this.employeesParams?.employeeSN],
      account: [this.employeesParams?.account],
      checkbox: [this.employeesParams?.deleted],
    });
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        if (this.employeesParams) {
          this.employeesParams.orderBy = sort.active;
          this.employeesParams.orderDirection = sort.direction;
          this.loadEmployeers();
        }
      });
    }
    this.filtersForm.valueChanges.subscribe((values) => {
      if (this.employeesParams) {
        this.employeesParams.surname =
          values.surname === null ? '' : values.surname;
        this.employeesParams.firstName =
          values.firstName === null ? '' : values.firstName;
        this.employeesParams.employeeSN =
          values.employeeSN === null ? '' : values.employeeSN;
        this.employeesParams.account =
          values.account === null ? '' : values.account;
        this.employeesParams.deleted =
          values.checkbox === null ? false : values.checkbox;

        this.employeesServices.setEmployeesParams(this.employeesParams);
        this.loadEmployeers();
      }
    });
  }

  loadEmployeers() {
    if (this.employeesParams) {
      this.employeesServices.setEmployeesParams(this.employeesParams);
      this.employeesServices
        .paginatedEmployees(this.employeesParams)
        .subscribe({
          next: (response) => {
            if (response.result && response.pagination) {
              this.employees = response.result;
              this.dataSource = new MatTableDataSource(this.employees);
              this.pagination = response.pagination;
              this.dataSource.sort = this.sort;
            }
          },
          error: (error) => console.log(error),
        });
    }
  }

  resetFilters() {
    this.filtersForm.reset();
  }

  pageChanged(event: any) {
    if (
      this.employeesParams &&
      this.employeesParams?.pageNumber !== event.page
    ) {
      this.employeesParams.pageNumber = event.pageIndex;
      this.employeesParams.pageSize = event.pageSize;
      this.employeesServices.setEmployeesParams(this.employeesParams);
      this.loadEmployeers();
    }
  }
}
