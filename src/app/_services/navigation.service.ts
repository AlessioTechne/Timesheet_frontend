import { NavigationStart, Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private previousUrl: string | undefined;
  private currentUrl: string | undefined;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  getPreviousUrl(): string {
    if (this.previousUrl === undefined || this.previousUrl === '/') {
      return this.getHomeUrl();
    }
    return this.previousUrl;
  }

  getHomeUrl(): string {
    return '/home';
  }
}
