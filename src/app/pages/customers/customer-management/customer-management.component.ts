import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { CustomerDto, CustomerParams } from '../../../_models/customer';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CustomersService } from '../../../_services/customers.service';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Pagination } from '../../../_models/pagination';
import { RouterLink } from '@angular/router';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-customer-management',
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
  providers: [{ provide: LOCALE_ID, useValue: 'it' }],
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.scss',
})
export class CustomerManagementComponent implements OnInit {
  customers: CustomerDto[] = [];
  pagination: Pagination | undefined;
  customerParams: CustomerParams | undefined;
  dataSource: MatTableDataSource<CustomerDto, MatPaginator>;
  @ViewChild(MatSort) sort: MatSort;
  filtersForm: FormGroup;

  displayedColumns = ['initials', 'customerName', 'vatId', 'action'];

  constructor(
    private customerServices: CustomersService,
    private fb: FormBuilder
  ) {
    this.customerParams = customerServices.getCustomerParams();
  }

  ngOnInit(): void {
    this.loadCustomer();
    this.initializeFilterForms();
  }

  ngAfterViewInit() {
    this.filtersForm.valueChanges.subscribe((values) => {
      if (this.customerParams) {
        this.customerParams.initials =
          values.initials === null ? '' : values.initials;
        this.customerParams.vatId = values.vatId === null ? '' : values.vatId;
        this.customerParams.customerName =
          values.customerName === null ? '' : values.customerName;

        this.customerServices.setCustomerParams(this.customerParams);
        this.loadCustomer();
      }
    });
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        if (this.customerParams) {
          this.customerParams.orderBy = sort.active;
          this.customerParams.orderDirection = sort.direction;
          this.loadCustomer();
        }
      });
    }
  }

  initializeFilterForms() {
    this.filtersForm = this.fb.group({
      initials: [this.customerParams?.initials],
      customerName: [this.customerParams?.customerName],
      vatId: [this.customerParams?.vatId],
    });
  }

  loadCustomer() {
    if (this.customerParams) {
      this.customerServices.setCustomerParams(this.customerParams);
      this.customerServices.paginatedCustomer(this.customerParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.customers = response.result;
            this.dataSource = new MatTableDataSource(this.customers);
            this.pagination = response.pagination;
          }
        },
      });
    }
  }

  resetFilters() {
    this.filtersForm.reset();
  }

  pageChanged(event: any) {
    if (this.customerParams && this.customerParams?.pageNumber !== event.page) {
      this.customerParams.pageNumber = event.pageIndex;
      this.customerParams.pageSize = event.pageSize;
      this.customerServices.setCustomerParams(this.customerParams);
      this.loadCustomer();
    }
  }
}
