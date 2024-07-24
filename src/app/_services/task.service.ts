import { Injectable, OnInit } from '@angular/core';
import {
  ProjectMembersOverviewDto,
  ProjectMembersParams,
  TaskEditDto,
  TaskNewDto,
  TaskParams,
  TasksDto,
} from '../_models/projectTask';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {
  baseUrl = environment.apiUrl + 'task/';
  taskParams: TaskParams;
  projectMembersParams: ProjectMembersParams;
  projectId: number;

  constructor(private http: HttpClient) {
    this.taskParams = new TaskParams();
    this.projectMembersParams = new ProjectMembersParams();
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

    return getPaginatedResult<TasksDto[]>(this.baseUrl, params, this.http).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getTask(id: number) {
    return this.http.get<TasksDto>(this.baseUrl + 'task/' + id);
  }

  getTaskParams() {
    return this.taskParams;
  }

  setTaskParams(taskParams: TaskParams) {
    this.taskParams = taskParams;
  }

  getProjectMembersParams() {
    return this.projectMembersParams;
  }

  setProjectMembersParams(projectMembersParams: ProjectMembersParams) {
    this.projectMembersParams = projectMembersParams;
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

  createNewTask(taskNewDto: TaskNewDto) {
    return this.http.post(this.baseUrl, taskNewDto);
  }

  editTask(taskEditDto: TaskEditDto) {
    return this.http.put(this.baseUrl, taskEditDto);
  }
}
