import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  TaskCloseDto,
  TaskDetailsDto,
  TaskOverviewDto,
} from '../../../../_models/projectTask';

import { AttachmentsComponent } from '../../pm-project-details/attachments/attachments.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProjectManagementService } from '../../../../_services/project-management.service';
import { ProjectsDto } from '../../../../_models/project';
import { TaskCloseDialogComponent } from './task-close-dialog/task-close-dialog.component';
import { TaskEmployeesComponent } from './task-employees/task-employees.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskInvoicesComponent } from './task-invoices/task-invoices.component';
import { TaskLogsComponent } from './task-logs/task-logs.component';
import { TaskOrderComponent } from './task-order/task-order.component';
import { TaskService } from '../../../../_services/task.service';

@Component({
  selector: 'app-single-task-overview',
  standalone: true,
  imports: [
    CommonModule,
    AttachmentsComponent,
    TaskEmployeesComponent,
    TaskInfoComponent,
    TaskInvoicesComponent,
    TaskOrderComponent,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    TaskLogsComponent,
  ],
  templateUrl: './single-task-overview.component.html',
  styleUrl: './single-task-overview.component.scss',
})
export class SingleTaskOverviewComponent implements OnInit {
  taskId: number;
  task: TaskDetailsDto | undefined;
  taskOverview: TaskOverviewDto | undefined;
  projectId: number;
  project: ProjectsDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectManagementService,
    private router: Router,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('projectId')) {
        this.projectId = +params.get('projectId')!;
        this.projectService.getProject(this.projectId).subscribe((project) => {
          this.project = project;
        });
      }

      if (params.has('taskId')) {
        this.taskId = +params.get('taskId')!;
        this.taskService.getTaskDetail(this.taskId).subscribe((task) => {
          this.task = task;
        });
        this.taskService
          .getTaskOverview(this.taskId)
          .subscribe((taskOverview) => {
            this.taskOverview = taskOverview;
          });
      }
    });
  }

  onTitleClick() {
    this.router.navigate(['../../../detail/' + this.projectId], {
      relativeTo: this.route,
    });
  }

  closeTask() {
    if (confirm('Sei sicuro di voler chiudere questo Task?')) {
      
      const dialogRef = this.dialog.open(TaskCloseDialogComponent, {});

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          var closeTask: TaskCloseDto = ({
            taskId: this.taskId,
            actualEndDate: result.actualEndDate,
          });

          this.taskService.closeTask(closeTask).subscribe(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
          });
        }
      });
    }
  }
}
