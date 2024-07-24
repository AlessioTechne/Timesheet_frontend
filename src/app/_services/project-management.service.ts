import { ProjectEditDto, ProjectNewDto, ProjectParams, ProjectsDto } from '../_models/project';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {

  baseUrl = environment.apiUrl + 'project/';
  projectParams: ProjectParams | undefined;

  constructor(private http: HttpClient) {
    this.projectParams = new ProjectParams();
  }

  paginatedProject(projectParams: ProjectParams) {
    let params = getPaginationheaders(
      projectParams.pageNumber,
      projectParams.pageSize
    );

    params = params.append('orderBy', projectParams.orderBy);
    params = params.append('statusId', projectParams.statusId);
    params = params.append('customerName', projectParams.customerName);
    params = params.append('projectName', projectParams.projectName);
    params = params.append('projectCode', projectParams.projectCode);
    //params = params.append('dueDate', projectParams.dueDate);
    params = params.append('orderDirection', projectParams.orderDirection);
    return getPaginatedResult<ProjectsDto[]>(
      this.baseUrl,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  resetProjectParams() {
    this.projectParams = new ProjectParams();
    return this.projectParams;
  }

  getProjectParams() {
    return this.projectParams;
  }

  setProjectParams(projectParams: ProjectParams) {
    this.projectParams = projectParams;
  }

  createProject(project: ProjectNewDto) {
    return this.http.post<ProjectNewDto>(this.baseUrl, project);
  }

  editProject(project: ProjectEditDto) {
    return this.http.put<ProjectEditDto>(this.baseUrl, project);
  }

  getProject(id: number) {
    return this.http.get<ProjectsDto>(this.baseUrl + id);
  }

  deleteProject(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
