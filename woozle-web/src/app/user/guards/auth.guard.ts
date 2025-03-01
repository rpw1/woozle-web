import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const authService = inject(AuthService);
  if (!accessToken || !refreshToken) {
    return authService.authorize();
  }

  const response = await authService.getRefreshToken();
  if (!response) {
    return authService.authorize();
  }

  return Promise.resolve(true);
};
