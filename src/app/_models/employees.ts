import { PaginationParams } from "./pagination";

export interface EmployeesDto {
  employeeId: number;
  surname: string;
  firstName: string;
  employeeSN: string;
  account: string;
  deleted: boolean;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
}
export class EmployeesNewDto {
  surname: string;
  firstName: string;
  employeeSN: string;
  account: string;
}

export class EmployeesEditDto {
  employeeId: number;
  surname: string;
  firstName: string;
  employeeSN: string;
  account: string;
}

export class EmployeesParam extends PaginationParams {
  firstName = '';
  surname = '';
  employeeSN = '';
  account = '';
  deleted = false;
}

export interface EmployeeTimetablesDto {
  wDay: number;
  minHours: number;
  maxHours: number;
}

export interface EmployeeTimetablesUpdateDto {
  employeeId: number;
  employeeTimeTable: EmployeeTimetablesDto[];
}
