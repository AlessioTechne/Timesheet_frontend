import { Component, Input, OnInit } from '@angular/core';

import { TaskService } from '../../../../_services/task.service';
import { TasksDto } from '../../../../_models/projectTask';

@Component({
  selector: 'app-single-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './single-task-detail.component.html',
  styleUrl: './single-task-detail.component.scss',
})
export class SingleTaskDetailComponent implements OnInit {
  task: TasksDto;
  @Input() taskId: number;

  constructor(private taskServices: TaskService) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask() {
    if (this.taskId) {
      this.taskServices.getTask(this.taskId).subscribe((task) => {
        this.task = task;
      });
    }
  }
}
