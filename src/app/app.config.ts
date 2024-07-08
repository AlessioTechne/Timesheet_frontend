import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    
    providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),  importProvidersFrom(HttpClientModule)]
};