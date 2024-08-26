import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { ProjectManagementService } from '../../../../_services/project-management.service';
import { ProjectStatsOrderDto } from '../../../../_models/project';

@Component({
  selector: 'app-stats-order',
  standalone: true,
  imports: [MatCardModule, DatePipe, CommonModule],
  templateUrl: './stats-order.component.html',
  styleUrl: './stats-order.component.scss',
})
export class StatsOrderComponent implements OnInit {
  @Input() projectId: number;
  projectStats: ProjectStatsOrderDto;

  constructor(private projectServices: ProjectManagementService) {}

  ngOnInit(): void {
    this.loadProjectStats();
  }

  loadProjectStats() {
    this.projectServices.getStatsOrder(this.projectId).subscribe({
      next: (response) => {
        this.projectStats = response;
      },
    });
  }
}
