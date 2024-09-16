import { Injectable, OnInit } from '@angular/core';
import {
  ProjectMembersOverviewDto,
  ProjectMembersParams,
  ProjectTeamMatrixDto,
  TaskCloseDto,
  TaskDetailsDto,
  TaskEditDto,
  TaskEmployeesDto,
  TaskLogsOverviewDto,
  TaskMemberParams,
  TaskMembersDto,
  TaskNewDto,
  TaskOverviewDto,
  TaskParams,
  TasksDto,
  WorkPackageTypesDto,
} from '../_models/projectTask';
import {
  TaskLogAddDto,
  TaskLogsDto,
  TaskLogsEditDto,
  TaskTimesheetDto,
} from '../_models/project';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { EmployeesDto } from '../_models/employees';
import { HttpClient } from '@angular/common/http';
import { Task } from '../ui-elements/checkbox/checkbox.component';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {

  baseUrl = environment.apiUrl + 'task/';
  taskParams: TaskParams;
  projectMembersParams: ProjectMembersParams;
  taskMemberParams: TaskMemberParams;
  projectId: number;

  constructor(private http: HttpClient) {
    this.taskParams = new TaskParams();
    this.projectMembersParams = new ProjectMembersParams();
    this.taskMemberParams = new TaskMemberParams();
  }

  ngOnInit(): void {}

  paginatedTasks(taskParams: TaskParams) {
    let params = getPaginationheaders(
      taskParams.pageNumber,
      taskParams.pageSize
    );
    params = params.append('orderBy', taskParams.orderBy);
    params = params.append('orderDirection', taskParams.orderDirection);
    params = params.append('projectId', taskParams.projectId);
    params = params.append('taskName', taskParams.taskName);
    params = params.append('actualStartDate', taskParams.actualStartDate ?? '');
    params = params.append('actualEndDate', taskParams.actualEndDate ?? '');

    return getPaginatedResult<TaskOverviewDto[]>(
      this.baseUrl,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getTask(id: number) {
    return this.http.get<TasksDto>(this.baseUrl + 'task/' + id);
  }

  getTaskDetail(id: number) {
    return this.http.get<TaskDetailsDto>(this.baseUrl + 'taskDetails/' + id);
  }
  getTaskOverview(taskId: number) {
    return this.http.get<TaskOverviewDto>(
      this.baseUrl + 'taskOverview/' + taskId
    );
  }

  getTaskParams() {
    return this.taskParams;
  }

  getProjectMembersParams() {
    return this.projectMembersParams;
  }

  getTaskMembersParams() {
    return this.taskMemberParams;
  }

  getTimeSheetTask(taskId: number) {
    return this.http.get<TaskTimesheetDto[]>(
      this.baseUrl + 'taskTimesheet/' + taskId
    );
  }

  getAssignedEmployees(taskId: number) {
    return this.http.get<EmployeesDto[]>(this.baseUrl + 'assignedEmployees/' + taskId);
  }

  getAllTaskLogs(taskId: number) {
    return this.http.get<TaskLogsOverviewDto[]>(
      this.baseUrl + 'allTaskLogss/' + taskId
    );
  }

  paginatedProjectMembers(projectMembersParams: ProjectMembersParams) {
    let params = getPaginationheaders(
      projectMembersParams.pageNumber,
      projectMembersParams.pageSize
    );

    params = params.append('projectId', projectMembersParams.projectId);

    return getPaginatedResult<ProjectMembersOverviewDto[]>(
      this.baseUrl + 'projectMembers',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  paginatedTaskMembers(taskMemberParams: TaskMemberParams) {
    let params = getPaginationheaders(
      taskMemberParams.pageNumber,
      taskMemberParams.pageSize
    );

    params = params.append('taskId', taskMemberParams.taskId);

    return getPaginatedResult<TaskMembersDto[]>(
      this.baseUrl + 'TaskEmployees',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createNewTask(taskNewDto: TaskNewDto) {
    return this.http.post(this.baseUrl, taskNewDto);
  }

  editTask(taskEditDto: TaskEditDto) {
    return this.http.put(this.baseUrl, taskEditDto);
  }

  closeTask(task: TaskCloseDto) {
    return this.http.put(this.baseUrl + 'closeTask/', task);
  }

  getProjectTeamMatrix(projectId: number, taskId: number) {
    return this.http.get<ProjectTeamMatrixDto>(
      this.baseUrl + 'employees/' + projectId + '/' + taskId
    );
  }

  setAssignTask(employees: TaskEmployeesDto) {
    return this.http.put(this.baseUrl + 'assignEmployees', employees);
  }

  setAssignAllTask(employees: TaskEmployeesDto) {
    return this.http.put(this.baseUrl + 'assignAllEmployees', employees);
  }

  getWPTypes() {
    return this.http.get<WorkPackageTypesDto[]>(this.baseUrl + 'wptype');
  }

  deleteTask(taskId: number) {
    return this.http.delete(this.baseUrl + taskId);
  }

  getTaskLogs(date: string) {
    return this.http.get<TaskLogsDto[]>(this.baseUrl + 'taskLogs/' + date);
  }

  saveTaskLogs(taskLogs: TaskLogsEditDto[]) {
    return this.http.post(this.baseUrl + 'taskLogs', taskLogs);
  }

  addTaskLog(taskLog: TaskLogAddDto) {
    return this.http.post(this.baseUrl + 'taskLogAdd', taskLog);
  }

  deleteTaskLog(taskLogId: number) {
    return this.http.delete(this.baseUrl + 'taskLogs/' + taskLogId);
  }

  updateTaskLog(data: TaskLogsEditDto) {
    return this.http.put(this.baseUrl + 'taskLogs', data);
  }
}
