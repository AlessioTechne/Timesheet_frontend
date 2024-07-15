import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';
import { Component } from '@angular/core';
import { InProgressComponent } from './in-progress/in-progress.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { PendingComponent } from './pending/pending.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pm-project-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule, AllComponent, InProgressComponent, CompletedComponent, PendingComponent],
  templateUrl: './pm-project-list.component.html',
  styleUrl: './pm-project-list.component.scss'
})
export class PmProjectListComponent {

}
