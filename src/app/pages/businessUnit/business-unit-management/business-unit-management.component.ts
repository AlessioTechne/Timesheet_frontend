import {
  BusinessUnitDto,
  BusinessUnitParams,
} from '../../../_models/businessUnit';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { BusinessUnitService } from '../../../_services/business-unit.service';
import { CommonModule } from '@angular/common';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Pagination } from '../../../_models/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-business-unit-management',
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
  ],
  templateUrl: './business-unit-management.component.html',
  styleUrl: './business-unit-management.component.scss',
})
export class BusinessUnitManagementComponent implements OnInit {
  businessUnit: BusinessUnitDto[] = [];
  pagination: Pagination | undefined;
  businessUnitParams: BusinessUnitParams | undefined;
  dataSource: MatTableDataSource<BusinessUnitDto, MatPaginator>;
  @ViewChild(MatSort) sort: MatSort;
  filtersForm: FormGroup;

  displayedColumns = ['businessUnitInitials', 'businessUnitName', 'action'];

  constructor(
    private businessUnitServices: BusinessUnitService,
    private fb: FormBuilder
  ) {
    this.businessUnitParams = businessUnitServices.getBusinessUnitParams();
  }

  ngOnInit(): void {
    this.loadBusinessUnit();
    this.initializeFilterForms();
    this.filtersForm.valueChanges.subscribe((values) => {
      if (this.businessUnitParams) {
        this.businessUnitParams.businessUnitInitials =
          values.businessUnitInitials === null
            ? ''
            : values.businessUnitInitials;

        this.businessUnitParams.businessUnitName =
          values.businessUnitName === null ? '' : values.businessUnitName;

        this.businessUnitServices.setBusinessUnitParams(
          this.businessUnitParams
        );
        this.loadBusinessUnit();
      }
    });
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        if (this.businessUnitParams) {
          this.businessUnitParams.orderBy = sort.active;
          this.businessUnitParams.orderDirection = sort.direction;
          this.loadBusinessUnit();
        }
      });
    }
  }

  initializeFilterForms() {
    this.filtersForm = this.fb.group({
      businessUnitInitials: [this.businessUnitParams?.businessUnitInitials],
      businessUnitName: [this.businessUnitParams?.businessUnitName],
    });
  }

  loadBusinessUnit() {
    if (this.businessUnitParams) {
      this.businessUnitServices.setBusinessUnitParams(this.businessUnitParams);
      this.businessUnitServices
        .paginatedbusinessUnit(this.businessUnitParams)
        .subscribe({
          next: (response) => {
            if (response.result && response.pagination) {
              this.businessUnit = response.result;
              this.dataSource = new MatTableDataSource(this.businessUnit);
              this.pagination = response.pagination;
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
      this.businessUnitParams &&
      this.businessUnitParams?.pageNumber !== event.page
    ) {
      this.businessUnitParams.pageNumber = event.pageIndex;
      this.businessUnitParams.pageSize = event.pageSize;
      this.businessUnitServices.setBusinessUnitParams(this.businessUnitParams);
      this.loadBusinessUnit();
    }
  }
}
