import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, delay, finalize, identity } from 'rxjs';

import { AuthService } from '../_services/auth.service';
import { LoadingService } from '../_services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environments';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authService = inject(AuthService);
  const _snakBar = inject(MatSnackBar);
  const router = inject(Router);
  const loadingService = inject(LoadingService);
  let totalRequests = 0;

  // Clone the request to add the authentication header.
  totalRequests++;
  loadingService.setLoading(true);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getAuthToken()}`,
    },
  });

  return next(authReq).pipe(
    environment.production ? identity : delay(1000),
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        loadingService.setLoading(false);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateError = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key])
                  modelStateError.push(error.error.errors[key]);
              }
              throw modelStateError.flat();
            } else {
              _snakBar.open(error.error, error.status.toString(), {
                duration: 3 * 1000,
              });
            }
            break;
          case 401:
            _snakBar.open('Unauthorized', error.status.toString(), {
              duration: 3 * 1000,
            });
            authService.logout();
            break;
          case 403:
            _snakBar.open('Unauthorized', error.status.toString(), {
              duration: 3 * 1000,
            });
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            _snakBar.open(error.error.message, error.status.toString());
            break;
          default:
            _snakBar.open('Something unexpected went wrong', undefined, {
              duration: 3 * 1000,
            });
            console.log(error);
            break;
        }
      }
      throw error;
    })
  );
};
