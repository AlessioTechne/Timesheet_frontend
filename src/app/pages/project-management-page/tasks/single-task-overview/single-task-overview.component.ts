import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AttachmentsComponent } from '../../pm-project-details/attachments/attachments.component';
import { SingleTaskDetailComponent } from '../single-task-detail/single-task-detail.component';
import { TaskService } from '../../../../_services/task.service';
import { TasksDto } from '../../../../_models/projectTask';

@Component({
  selector: 'app-single-task-overview',
  standalone: true,
  imports: [AttachmentsComponent, SingleTaskDetailComponent],
  templateUrl: './single-task-overview.component.html',
  styleUrl: './single-task-overview.component.scss',
})
export class SingleTaskOverviewComponent implements OnInit {
  taskId: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('idTask')) {
        this.taskId = +params.get('idTask')!;
      }
    });
  }
}
