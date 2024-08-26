import { PaginationParams } from './pagination';

export interface ProjectsDto {
  projectId: number;
  projectName: string;
  projectCode: string;
  projectCreatedAt: Date | null;
  quoteNumber: string;
  businessUnitName: string;
  businessUnitInitials: string;
  quoteDate: Date | null;
  projectLeaderId: number;
  projectLeader: string;
  customerId: number;
  customerName: string;
  customerReference: string;
  estimatedEffortInDays: number | null;
  dueDate: Date | null;
  statusId: string;
  statusName: string;
  numCompletedTasks: number | null;
  numOpenedTasks: number | null;
  totNumTasks: number | null;
  totEstimatedEffortInDays: number | null;
  totTaskLoggedDays: number | null;
  totNotBudgetedTaskLoggedDays: number | null;
  notes: string;
}

export interface ProjectEditDto {
  projectId: number;
  projectName: string;
  projectCode: string;
  projectLeaderId: number;
  customerId: number;
  dueDate: Date | null;
  businessUnitId: number;
  quoteNumber: string;
  quoteDate: Date | null;
  quoteAmount: number | null;
  estimatedEffortInDays: number | null;
  salesOrderNumber: string;
  salesOrderDate: Date | null;
  salesOrderAmount: number | null;
  invoiceNumber: string;
  invoiceDate: Date | null;
  statusId: string;
  approved: boolean;
  notes: string;
}

export interface ProjectNewDto {
  projectName: string;
  projectCode: string;
  projectLeaderId: number;
  customerId: number;
  dueDate: Date | null;
  customerReference: string;
  businessUnitId: number;
  estimatedEffortInDays: number | null;
  approved: boolean;
  notes: string; 
}

export class ProjectParams extends PaginationParams {
  projectCode = '';
  projectName = '';
  statusId = '';
  customerName = '';
  dueDate: string;
}

export interface ProjectStatsOrderDto {
  quoteNumber: string | null;
  quoteDate: Date | null;
  quoteAmount: number | null;
  estimatedEffortInDays: number | null;
  salesOrderNumber: string;
  salesOrderDate: Date | null;
  salesOrderAmount: number | null;
  invoiceNumber: string;
  invoiceDate: Date | null;
}