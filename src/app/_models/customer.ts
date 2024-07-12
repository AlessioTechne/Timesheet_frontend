export interface CustomerDto {
  customerId: number;
  customerName: string;
  vatId: string;
  initials: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

export interface CustomerEditDto {
  customerId: number;
  customerName: string;
  vatId: string;
  initials: string;
}

export interface CustomerNewDto {
  customerName: string;
  vatId: string;
  initials: string;
}

export class CustomerParams {
  customerName = '';
  initials = '';
  vatId = '';
  pageNumber = 0;
  pageSize = 10;
  orderBy = 'name';
  orderDirection = '';
}
