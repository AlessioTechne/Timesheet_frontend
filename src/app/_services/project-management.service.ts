import {
  AttachmentParams,
  ProjectAttachmentsDto,
} from '../_models/projectTask';
import {
  ProjectEditDto,
  ProjectMembersTimesheetDto,
  ProjectNewDto,
  ProjectParams,
  ProjectStatsOrderDto,
  ProjectStatusDto,
  ProjectsDto,
  TaskLogsDto,
} from '../_models/project';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementService {
  baseUrl = environment.apiUrl + 'project/';
  projectParams: ProjectParams | undefined;
  attachmentParams: AttachmentParams | undefined;

  constructor(private http: HttpClient) {
    this.projectParams = new ProjectParams();
    this.attachmentParams = new AttachmentParams();
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

  getMyProjectParams() {
    return this.projectParams;
  }

  getAttachmentsParams() {
    return this.attachmentParams;
  }

  setProjectParams(projectParams: ProjectParams) {
    this.projectParams = projectParams;
  }

  setAttachmentsParams(attachmentParams: AttachmentParams) {
    this.attachmentParams = attachmentParams;
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

  editAttachment(project: FormData) {
    return this.http.put(this.baseUrl + 'projectAttachments', project);
  }

  newAttachment(project: FormData) {
    return this.http.post(this.baseUrl + 'projectAttachments', project);
  }

  deleteAttachment(id: number) {
    return this.http.delete(this.baseUrl + 'projectAttachments/' + id);
  }

  getPaginatedAttachment(attachmentParams: AttachmentParams) {
    let params = getPaginationheaders(
      attachmentParams.pageNumber,
      attachmentParams.pageSize
    );

    params = params.append('orderBy', attachmentParams.orderBy);
    params = params.append('projectId', attachmentParams.projectId);
    params = params.append('orderDirection', attachmentParams.orderDirection);

    return getPaginatedResult<ProjectAttachmentsDto[]>(
      this.baseUrl + 'projectAttachments/',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAttachmentfile(id: number) {
    return this.http.get(this.baseUrl + 'downloadAttachment/' + id, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  getStatsOrder(projectId: number) {
    return this.http.get<ProjectStatsOrderDto>(
      this.baseUrl + 'statsOrder/' + projectId
    );
  }

  getEditProject(projectId: number) {
    return this.http.get<ProjectEditDto>(this.baseUrl + 'edit/' + projectId);
  }

  getProjectStatus() {
    return this.http.get<ProjectStatusDto[]>(this.baseUrl + 'projectStatus');
  }

  getMyPaginatedProject(projectParams: ProjectParams) {
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
    return getPaginatedResult<ProjectMembersTimesheetDto[]>(
      this.baseUrl +'myProjects',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  postTimesheet(newTaskTimesheetDto : TaskLogsDto[]){
    return this.http.post(this.baseUrl + 'timesheet', newTaskTimesheetDto);
  }
}
