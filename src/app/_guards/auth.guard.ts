import { AuthService } from '../_services/auth.service';
import { CanActivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AuthService);
  const snack = inject(MatSnackBar);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else {
        snack.open('TU NON PUOI PASSARE!', 'Chiudi');
        return false;
      }
    })
  )
};
