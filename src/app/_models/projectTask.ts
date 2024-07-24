import { PaginationParams } from './pagination';

export interface TasksDto {
  taskId: number;
  taskNumber: number;
  taskName: string;
  estimatedEffortInDays: number;
  actualStartDate: Date;
  actualEndDate: Date;
  hasBudget: boolean;
  costCenter: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

export class TaskNewDto {
  projectId: number;
  taskNumber: number;
  taskName: string;
  estimatedEffortInDays: number;
  actualStartDate: Date;
  actualEndDate: Date;
  hasBudget: boolean;
  costCenter: string;
}

export class TaskEditDto {
  taskId: number;
  taskNumber: number;
  taskName: string;
  estimatedEffortInDays: number;
  actualStartDate: Date;
  actualEndDate: Date;
  hasBudget: boolean;
  costCenter: string;
}

export class TaskParams extends PaginationParams {
  projectId: number;
  taskName: string = '';
  actualStartDate: string | null;
  actualEndDate: string | null;
}

export class ProjectMembersOverviewDto {
  projectId: number;
  memberType: string;
  employeeid: number;
  employeeSN: string;
  surname: string;
  firstName: string;
  numAssisgnedTasks: number;
}

export class ProjectMembersParams extends PaginationParams {
  projectId: number;
}
