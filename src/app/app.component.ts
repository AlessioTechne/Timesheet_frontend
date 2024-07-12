declare let $: any;
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ToggleService } from '../app/common/header/toggle.service';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import {
  CommonModule,
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import {
  RouterOutlet,
  Router,
  NavigationCancel,
  NavigationEnd,
  RouterLink,
} from '@angular/router';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
})
export class AppComponent {
  title = 'Timesheet';
  routerSubscription: any;
  location: any;

  constructor(
    public router: Router,
    public toggleService: ToggleService,
    private authServices: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.toggleService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  // Toggle Service
  isToggled = false;

  // Dark Mode
  toggleTheme() {
    this.toggleService.toggleTheme();
  }

  // Settings Button Toggle
  toggle() {
    this.toggleService.toggle();
  }

  // ngOnInit
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.recallJsFuntions();
      this.setCurrentUser();
    }
  }

  // recallJsFuntions
  recallJsFuntions() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        this.scrollToTop();
      });
  }
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.authServices.setCurrentUser(user);
  }
}
