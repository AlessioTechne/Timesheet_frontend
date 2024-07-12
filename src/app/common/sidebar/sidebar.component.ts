import { CommonModule, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
import { Component } from '@angular/core';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToggleService } from '../header/toggle.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    MatExpansionModule,
    RouterLinkActive,
    RouterModule,
    RouterLink,
    NgClass,
    FeathericonsModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    private toggleService: ToggleService,
    public authService: AuthService
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

  // Mat Expansion
  panelOpenState = false;
}
