import { Component, Input } from '@angular/core';

import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskDetailsDto } from '../../../../../_models/projectTask';

@Component({
  selector: 'app-task-order',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule, DatePipe],
  templateUrl: './task-order.component.html',
  styleUrl: './task-order.component.scss'
})
export class TaskOrderComponent {
  @Input() task:TaskDetailsDto

}
