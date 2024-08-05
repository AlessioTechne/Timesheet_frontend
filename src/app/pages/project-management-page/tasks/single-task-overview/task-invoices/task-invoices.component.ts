import { Component, Input } from '@angular/core';

import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskDetailsDto } from '../../../../../_models/projectTask';

@Component({
  selector: 'app-task-invoices',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule, DatePipe],
  templateUrl: './task-invoices.component.html',
  styleUrl: './task-invoices.component.scss'
})
export class TaskInvoicesComponent {
  @Input() task:TaskDetailsDto

}
