import { MaybeAsync, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authCallbackResolver: ResolveFn<boolean> = (route, state): MaybeAsync<boolean | RedirectCommand> => {
  console.log('In Duh Auth Service');
  const authService = inject(AuthService);
  const router = inject(Router);
  const error = route.queryParams['error'];
  if (error) {
    console.error(error);
    return new RedirectCommand(router.parseUrl('/forbidden'));
  }
  const code = route.queryParams['code'];
  console.log(code)
  const isAuthenticated = authService.getAuthToken(code);
  if (!isAuthenticated) {
    return new RedirectCommand(router.parseUrl('/forbidden'));
  }

  return true;
};
