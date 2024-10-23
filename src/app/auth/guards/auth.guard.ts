import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : MaybeAsync<GuardResult> => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const authService = inject(AuthService);
    if (!accessToken || !refreshToken) {
      
      return authService.authorize();
    }

    const response = authService.getRefreshToken();
    if (!response) {
      return authService.authorize();
    }
    
    return true;
};
