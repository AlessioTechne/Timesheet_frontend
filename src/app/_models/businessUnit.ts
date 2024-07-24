import { PaginationParams } from "./pagination";

export interface BusinessUnitDto {
  businessUnitId: number;
  businessUnitName: string;
  businessUnitInitials: string;
}

export interface BusinessUnitEditDto {
  businessUnitId: number;
  businessUnitName: string;
  businessUnitInitials: string;
}

export interface BusinessUnitNewDto {
  businessUnitName: string;
  businessUnitInitials: string;
}

export class BusinessUnitParams extends PaginationParams  {
  businessUnitName = '';
  businessUnitInitials = '';
}
