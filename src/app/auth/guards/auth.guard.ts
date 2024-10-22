import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : MaybeAsync<GuardResult> => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      const authService = inject(AuthService);
      return authService.authorize();
    }
    return true;
};
