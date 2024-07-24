import { PaginationParams } from './pagination';

export interface ProjectsDto {
  projectId: number;
  projectName: string;
  projectCode: string;
  projectLeaderId: number;
  projectLeader: string;
  customerId: number;
  customerName: string;
  customerReference: string;
  estimatedEffortInDays: number;
  dueDate: Date ;
  statusId: string;
  statusName: string;
  numCompletedTasks: number | null;
  numOpenedTasks: number | null;
  totNumTasks: number | null;
  totEstimatedEffortInDays: number | null;
  totTaskLoggedDays: number | null;
  totNotBudgetedTaskLoggedDays: number | null;
}

export interface ProjectEditDto {
  projectId: number;
  projectName: string;
  projectInitials: string;
}

export interface ProjectNewDto {
  projectName: string;
  projectInitials: string;
}

export class ProjectParams extends PaginationParams {
  projectCode = '';
  projectName = '';
  statusId = '';
  customerName = '';
  dueDate: string;
}
