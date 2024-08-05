import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ProjectMembersOverviewDto,
  ProjectMembersParams,
} from '../../../../_models/projectTask';

import { CommonModule } from '@angular/common';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Pagination } from '../../../../_models/pagination';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../../_services/task.service';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FeathericonsModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss',
})
export class TeamMembersComponent implements OnInit {
  @Input() projectId: number;
  projectMemberOverview: ProjectMembersOverviewDto[] = [];
  projectMemberParams: ProjectMembersParams | undefined;
  dataSource: MatTableDataSource<ProjectMembersOverviewDto, MatPaginator>;
  pagination: Pagination | undefined;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['surname', 'numAssisgnedTasks'];

  constructor(private taskServices: TaskService) {
    this.projectMemberParams = taskServices.getProjectMembersParams();
  }

  ngOnInit(): void {
    if (this.projectMemberParams) {
      this.projectMemberParams.projectId = this.projectId;
      this.loadProjectMembers();
    }
  }

  loadProjectMembers() {
    if (this.projectMemberParams) {
      this.taskServices
        .paginatedProjectMembers(this.projectMemberParams)
        .subscribe((response) => {
          if (response.result && response.pagination) {
            this.projectMemberOverview = response.result;
            this.dataSource = new MatTableDataSource(
              this.projectMemberOverview
            );
            this.pagination = response.pagination;
          }
        });
    }
  }

  pageChanged(event: any) {
    if (this.projectMemberParams) {
      this.projectMemberParams.pageNumber = event.pageIndex;
      this.projectMemberParams.pageSize = event.pageSize;
      this.loadProjectMembers();
    }
  }
}
