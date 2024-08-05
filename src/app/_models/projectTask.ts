import { EmployeesDto } from './employees';
import { PaginationParams } from './pagination';

export interface TasksDto {
  taskId: number;
  taskNumber: number;
  taskName: string;
  actualStartDate: string;
  actualEndDate: string;
  estimatedEffortInDays: number;
  costCenter: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
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
  employeeId: number;
  employeeSN: string;
  surname: string;
  firstName: string;
  numAssisgnedTasks: number;
}

export class ProjectMembersParams extends PaginationParams {
  projectId: number;
  taskid: number;
}

export interface TaskOverviewDto {
  taskId: number;
  projectId: number;
  taskNumber: number;
  taskName: string;
  wPTypeId: string;
  wPTypeName: string;
  actualStartDate: Date;
  actualEndDate: Date;
  createdAt: string;
  hasBudget: boolean;
  estimatedEffortInDays: number;
  taskLoggedDaysByBudget: number;
  taskLoggedDaysOutOfBudget: number;
}

export interface ProjectTeamMatrixDto {
  projectId: number;
  taskId: number;
  employeeId: number;
  surname: string;
  firstName: string;
  employeeSN: string;
  isMember: boolean;
  deleted: boolean;
  isDeletedMember: boolean;
}

export interface TaskEmployeesDto {
  taskId: number;
  projectId: number;
  employees: EmployeesDto[];
}

export class AttachmentParams extends PaginationParams {
  projectId: number;
}

export interface ProjectAttachmentsDto {
  attachmentId: number;
  projectId: number;
  attachmentName: string;
  attachmentDescription: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

export interface ProjectAttachmentsEditDto {
  attachmentId: number;
  attachmentName: string;
  file: FormData;
}

export interface ProjectAttachmentsNewDto {
  projectId: number;
  attachmentName: string;
  file: FormData;
}

export class TaskMemberParams extends PaginationParams {
  taskId: number;
}

export interface TaskMembersDto {
  firstName: string;
  surname: string;
}

export interface TaskDetailsDto {
  taskId: number;
  projectId: number;
  taskNumber: number;
  taskName: string;
  wPTypeId: string;
  actualStartDate: string;
  actualEndDate: Date;
  hasBudget: boolean;
  hasLogsAsSubtasks: boolean;
  estimatedEffortInDays: number;
  salesOrderNumber: string;
  salesOrderDate: Date;
  costCenter: string;
  notes: string;
  invoiceNumber: string;
  invoiceDate: Date;
  approved: boolean;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

