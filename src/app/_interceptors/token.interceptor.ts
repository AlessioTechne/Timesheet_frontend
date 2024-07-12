import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAuthToken();
  const _snakBar = inject(MatSnackBar);
  const router = inject(Router);
  
  // Clone the request to add the authentication header.

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(authReq).pipe(
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
              _snakBar.open(error.error, error.status.toString());
            }
            break;
          case 401:
            _snakBar.open('Unauthorized', error.status.toString());
            break;
          case 403:
            _snakBar.open('Unauthorized', error.status.toString());
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            _snakBar.open('Something unexpected went wrong');
            console.log(error);
            break;
        }
      }
      throw error;
    })
  );
};
