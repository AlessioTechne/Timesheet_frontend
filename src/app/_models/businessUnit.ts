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

export class BusinessUnitParams {
  businessUnitName = '';
  businessUnitInitials = '';
  pageNumber = 0;
  pageSize = 10;
  orderBy = 'name';
  orderDirection = '';
}
