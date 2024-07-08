import { Component, OnInit } from '@angular/core';
import { CustomerDto, CustomerParams } from '../../../_models/customer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.scss',
})
export class CustomerManagementComponent implements OnInit {
  customers: CustomerDto[] = [];
  pagination: Pagination | undefined;
  customerParams: CustomerParams | undefined;
  dataSource: MatTableDataSource<CustomerDto, MatPaginator>;

  displayedColumns = ['initials', 'customerName', 'vatId', 'action'];

  constructor(private customerServices: CustomersService) {
    this.customerParams = customerServices.getCustomerParams();
  }
  ngOnInit(): void {
    this.loadCustomer();
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
        error: (error) => console.log(error),
      });
    }
  }

  resetFilters() {
    this.customerParams = this.customerServices.resetUserParams();
    this.loadCustomer();
  }

  pageChanged(event: any) {
    if (this.customerParams && this.customerParams?.pageNumber !== event.page) {
      this.customerParams.pageNumber = event.pageIndex;
      this.customerParams.pageSize = event.pageSize;
      this.customerServices.setCustomerParams(this.customerParams);
      this.loadCustomer();
    }
  }

  applyFilter(event: any) {
    
    const filterValue = event.target as HTMLInputElement;

    console.log(filterValue.name)

    if (this.customerParams) {
      switch (filterValue.name) {
        case 'initials':
          console.log(filterValue.value);
          this.customerParams.initials = filterValue.value;
          break;

        case 'vatId':
          this.customerParams.vatId = filterValue.value;
          break;

        case 'customerName':
          this.customerParams.customerName = filterValue.value;
          break;

        default:
          break;
      }
      this.customerParams.pageNumber = 0;
      this.customerServices.setCustomerParams(this.customerParams);
    }
    this.loadCustomer();
  }
}
