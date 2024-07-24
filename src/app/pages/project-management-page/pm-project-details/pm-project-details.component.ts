import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AttachmentsComponent } from './attachments/attachments.component';
import { CommonModule } from '@angular/common';
import { ProjectManagementService } from '../../../_services/project-management.service';
import { ProjectsDto } from '../../../_models/project';
import { StatsComponent } from './stats/stats.component';
import { TaskOverviewComponent } from './task-overview/task-overview.component';
import { TeamMembersComponent } from './team-members/team-members.component';

@Component({
  selector: 'app-pm-project-details',
  standalone: true,
  imports: [
    StatsComponent,
    TeamMembersComponent,
    TaskOverviewComponent,
    CommonModule,
    AttachmentsComponent,
  ],
  templateUrl: './pm-project-details.component.html',
  styleUrl: './pm-project-details.component.scss',
})
export class PmProjectDetailsComponent implements OnInit {
  projectId: number;
  projectDto: ProjectsDto;

  constructor(
    private projectServices: ProjectManagementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('idProject')) {
        this.projectId = +params.get('idProject')!;
      }
    });
    this.loadProject();
  }

  loadProject() {
    this.projectServices.getProject(this.projectId).subscribe({
      next: (response) => {
        this.projectDto = response;
      },
    });
  }
}
