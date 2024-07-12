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

export class EmployeesParam {
  firstName = '';
  surname = '';
  employeeSN = '';
  account = '';
  pageNumber = 0;
  pageSize = 10;
  orderBy = '';
  orderDirection = '';
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
