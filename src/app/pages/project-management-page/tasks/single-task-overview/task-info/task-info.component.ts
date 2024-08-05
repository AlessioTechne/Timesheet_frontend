import { Component, Input, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskDetailsDto } from '../../../../../_models/projectTask';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule, DatePipe],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss'
})
export class TaskInfoComponent implements OnInit {
  @Input() task:TaskDetailsDto

  constructor() {}

  ngOnInit(): void {}


}
