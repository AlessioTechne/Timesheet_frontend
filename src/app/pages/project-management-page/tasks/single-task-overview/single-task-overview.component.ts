import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AttachmentsComponent } from '../../pm-project-details/attachments/attachments.component';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './single-task-overview.component.html',
  styleUrl: './single-task-overview.component.scss',
})
export class SingleTaskOverviewComponent implements OnInit {
  taskId: number;
  task: TaskDetailsDto;
  projectId: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('projectId')) {
        this.projectId = +params.get('projectId')!;
      }

      if (params.has('taskId')) {
        this.taskId = +params.get('taskId')!;
        this.taskService.getTaskDetail(this.taskId).subscribe((task) => {
          this.task = task;
        });
      }
    });
  }
}
