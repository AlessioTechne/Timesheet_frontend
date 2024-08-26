import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { PmProjectViewComponent } from './pm-project-view/pm-project-view.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pm-project-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    PmProjectViewComponent,
    MatIcon,
  ],
  templateUrl: './pm-project-list.component.html',
  styleUrl: './pm-project-list.component.scss',
})
export class PmProjectListComponent {}
