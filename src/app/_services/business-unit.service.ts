import { BusinessUnitDto, BusinessUnitEditDto, BusinessUnitNewDto, BusinessUnitParams } from '../_models/businessUnit';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitService {
  baseUrl = environment.apiUrl + 'businessUnit/';
  businessUnitParams: BusinessUnitParams | undefined;

  constructor(private http: HttpClient) {
    this.businessUnitParams = new BusinessUnitParams();
  }

  paginatedbusinessUnit(businessUnitParams: BusinessUnitParams) {
    let params = getPaginationheaders(
      businessUnitParams.pageNumber,
      businessUnitParams.pageSize
    );

    params = params.append('orderBy', businessUnitParams.orderBy);
    params = params.append('businessUnitInitials', businessUnitParams.businessUnitInitials);
    params = params.append('businessUnitName', businessUnitParams.businessUnitName);
    params = params.append('orderDirection', businessUnitParams.orderDirection);

    return getPaginatedResult<BusinessUnitDto[]>(
      this.baseUrl,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  resetBusinessUnitParams() {
    this.businessUnitParams = new BusinessUnitParams();
    return this.businessUnitParams;
  }

  getBusinessUnitParams() {
    return this.businessUnitParams;
  }

  setBusinessUnitParams(businessUnitParams: BusinessUnitParams) {
    this.businessUnitParams = businessUnitParams;
  }

  createBusinessUnit(businessUnit: BusinessUnitNewDto) {
    return this.http.post<BusinessUnitNewDto>(this.baseUrl, businessUnit);
  }

  editBusinessUnit(businessUnit: BusinessUnitEditDto) {
    console.log(businessUnit);
    return this.http.put<BusinessUnitEditDto>(this.baseUrl, businessUnit);
  }

  getBusinessUnit(id: number) {
    return this.http.get<BusinessUnitDto>(this.baseUrl + id);
  }

  deleteBusinessUnit(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
