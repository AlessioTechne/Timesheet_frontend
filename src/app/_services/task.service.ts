import { Injectable, OnInit } from '@angular/core';
import {
  ProjectMembersOverviewDto,
  ProjectMembersParams,
  ProjectTeamMatrixDto,
  TaskDetailsDto,
  TaskEditDto,
  TaskEmployeesDto,
  TaskMemberParams,
  TaskMembersDto,
  TaskNewDto,
  TaskOverviewDto,
  TaskParams,
  TasksDto,
} from '../_models/projectTask';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

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
  getTaskOverview(id: number) {
    return this.http.get<TaskOverviewDto>(this.baseUrl + 'task/' + id);
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
}
