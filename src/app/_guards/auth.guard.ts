import { AuthService } from '../_services/auth.service';
import { CanActivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AuthService);
  const snack = inject(MatSnackBar);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else {
        router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        snack.open('TU NON PUOI PASSARE!', 'Chiudi');
        return false;
      }
    })
  )
};
