import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
import { Component } from '@angular/core';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleService } from './toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FeathericonsModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [DatePipe],
})
export class HeaderComponent {
  constructor(
    public toggleService: ToggleService,
    private datePipe: DatePipe,
    public authService: AuthService,
    private router: Router
  ) {
    this.toggleService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  // Toggle Service
  isToggled = false;
  toggle() {
    this.toggleService.toggle();
  }

  // Dark Mode
  toggleTheme() {
    this.toggleService.toggleTheme();
  }

  // Current Date
  currentDate: Date = new Date();
  formattedDate: any = this.datePipe.transform(
    this.currentDate,
    'dd MMMM yyyy'
  );

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }
}
