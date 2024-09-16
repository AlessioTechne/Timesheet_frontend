import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { tokenInterceptor } from './_interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
};
