import {
  EmployeeTimetablesDto,
  EmployeeTimetablesUpdateDto,
  EmployeesDto,
  EmployeesEditDto,
  EmployeesNewDto,
  EmployeesParam,
} from '../_models/employees';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseUrl = environment.apiUrl + 'employees/';
  employeesParam: EmployeesParam | undefined;

  constructor(private http: HttpClient) {
    this.employeesParam = new EmployeesParam();
  }

  paginatedEmployees(employeesParam: EmployeesParam) {
    let params = getPaginationheaders(
      employeesParam.pageNumber,
      employeesParam.pageSize
    );

    params = params.append('orderBy', employeesParam.orderBy);
    params = params.append('surname', employeesParam.surname);
    params = params.append('firstName', employeesParam.firstName);
    params = params.append('account', employeesParam.account);
    params = params.append('employeeSN', employeesParam.employeeSN);
    params = params.append('orderDirection', employeesParam.orderDirection);
    params = params.append('deleted', employeesParam.deleted);

    return getPaginatedResult<EmployeesDto[]>(
      this.baseUrl,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  resetEmployeesParams() {
    this.employeesParam = new EmployeesParam();
    return this.employeesParam;
  }

  getEmployeesParams() {
    return this.employeesParam;
  }

  setEmployeesParams(employeesParam: EmployeesParam) {
    this.employeesParam = employeesParam;
  }

  createEmployees(employees: EmployeesNewDto) {
    return this.http.post<EmployeesNewDto>(this.baseUrl, employees);
  }

  editEmployees(employees: EmployeesEditDto) {
    return this.http.put<EmployeesEditDto>(this.baseUrl, employees);
  }

  getEmployees() {
    return this.http.get<EmployeesDto[]>(this.baseUrl);
  }

  getEmployee(id: number) {
    return this.http.get<EmployeesDto>(this.baseUrl + id);
  }

  deleteEmployees(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  getTimetables(id: number) {
    return this.http.get<EmployeeTimetablesDto[]>(
      this.baseUrl + 'timetable/' + id
    );
  }

  updateTimetable(employeeTimetablesUpdateDto: EmployeeTimetablesUpdateDto) {
    return this.http.put(
      this.baseUrl + 'timetable',
      employeeTimetablesUpdateDto
    );
  }

  getAllEmployees() {
    return this.http.get<EmployeesDto[]>(this.baseUrl + 'all');
  }
}
