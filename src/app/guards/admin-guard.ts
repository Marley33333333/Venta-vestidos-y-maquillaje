import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router  = inject(Router);

  return authService.user$.pipe(
    map(user => {
      if (user && user.role === 'admin') {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};