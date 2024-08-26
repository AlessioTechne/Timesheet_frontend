import {
  CustomerDto,
  CustomerEditDto,
  CustomerNewDto,
  CustomerParams,
} from '../_models/customer';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  baseUrl = environment.apiUrl + 'customer/';
  customerParams: CustomerParams | undefined;

  constructor(private http: HttpClient) {
    this.customerParams = new CustomerParams();
  }

  paginatedCustomer(customerParams: CustomerParams) {
    let params = getPaginationheaders(
      customerParams.pageNumber,
      customerParams.pageSize
    );

    params = params.append('orderBy', customerParams.orderBy);
    params = params.append('initials', customerParams.initials);
    params = params.append('vatId', customerParams.vatId);
    params = params.append('customerName', customerParams.customerName);
    params = params.append('orderDirection', customerParams.orderDirection);

    return getPaginatedResult<CustomerDto[]>(
      this.baseUrl,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  resetCustomerParams() {
    this.customerParams = new CustomerParams();
    return this.customerParams;
  }

  getCustomerParams() {
    return this.customerParams;
  }

  setCustomerParams(customerParams: CustomerParams) {
    this.customerParams = customerParams;
  }

  createCustomer(customer: CustomerNewDto) {
    return this.http.post<CustomerNewDto>(this.baseUrl, customer);
  }

  editCustomer(customer: CustomerEditDto) {
    return this.http.put<CustomerEditDto>(this.baseUrl, customer);
  }

  getCustomer(id: number) {
    return this.http.get<CustomerDto>(this.baseUrl + id);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  getAllCustomers() {
    return this.http.get<CustomerDto[]>(this.baseUrl + 'all');
  }
}
