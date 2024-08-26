import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AttachmentsComponent } from '../../pm-project-details/attachments/attachments.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../../../_services/navigation.service';
import { ProjectManagementService } from '../../../../_services/project-management.service';
import { ProjectsDto } from '../../../../_models/project';
import { TaskDetailsDto } from '../../../../_models/projectTask';
import { TaskEmployeesComponent } from './task-employees/task-employees.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskInvoicesComponent } from './task-invoices/task-invoices.component';
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
    MatButtonModule
  ],
  templateUrl: './single-task-overview.component.html',
  styleUrl: './single-task-overview.component.scss',
})
export class SingleTaskOverviewComponent implements OnInit {
  taskId: number;
  task: TaskDetailsDto;
  projectId: number;
  project: ProjectsDto;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectManagementService,
    private navigationService: NavigationService,
    private router: Router
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
      }
    });
  }

  onTitleClick() {
    this.router.navigate([this.navigationService.getPreviousUrl()]);
  }
}
