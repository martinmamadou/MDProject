import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.isAdmin().pipe(
    map(isAdmin => {
      console.log('🛡️ Guard Admin:', isAdmin);
      if (!isAdmin) {
        router.navigate(['/']);
      }
      return isAdmin;
    })
  );
};
