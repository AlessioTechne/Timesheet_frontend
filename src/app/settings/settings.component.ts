import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    RouterLinkActive,
    RouterLink,
    FeathericonsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
