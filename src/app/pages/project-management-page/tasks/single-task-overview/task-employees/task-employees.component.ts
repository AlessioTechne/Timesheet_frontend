import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  TaskEmployeesDto,
  TaskMemberParams,
  TaskMembersDto,
} from '../../../../../_models/projectTask';

import { CommonModule } from '@angular/common';
import { DialogMembersComponent } from '../../../pm-project-details/dialog-members/dialog-members.component';
import { FeathericonsModule } from '../../../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Pagination } from '../../../../../_models/pagination';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../../../_services/task.service';

@Component({
  selector: 'app-task-employees',
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
  templateUrl: './task-employees.component.html',
  styleUrl: './task-employees.component.scss',
})
export class TaskEmployeesComponent implements OnInit {
  @Input() projectId: number;
  @Input() taskId: number;
  projectMemberOverview: TaskMembersDto[] = [];
  taskMemberParams: TaskMemberParams | undefined;
  dataSource: MatTableDataSource<TaskMembersDto, MatPaginator>;
  pagination: Pagination | undefined;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['surname', 'firstName'];

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.taskMemberParams = taskService.getTaskMembersParams();
  }

  ngOnInit(): void {
    if (this.taskMemberParams) {
      this.taskMemberParams.taskId = this.taskId;
      this.loadTaskMembers();
    }
  }

  loadTaskMembers() {
    if (this.taskMemberParams) {
      this.taskService
        .paginatedTaskMembers(this.taskMemberParams)
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
    if (this.taskMemberParams) {
      this.taskMemberParams.pageNumber = event.pageIndex;
      this.taskMemberParams.pageSize = event.pageSize;
      this.loadTaskMembers();
    }
  }

  openDialog() {
    this.taskService
      .getProjectTeamMatrix(this.projectId, this.taskId)
      .subscribe({
        next: (response) => {
          const dialogRef = this.dialog.open(DialogMembersComponent, {
            data: { employees: response, saveAll: false },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;

            var assignTaskDto: TaskEmployeesDto = {
              projectId: this.projectId,
              taskId: this.taskId,
              employees: result.data,
            };

            this.taskService.setAssignTask(assignTaskDto).subscribe({
              next: () => {
                this.loadTaskMembers();
              },
            });
          });
        },
      });
  }
}
