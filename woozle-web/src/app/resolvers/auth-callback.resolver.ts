import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { AuthService } from '../user/services/auth.service';

export const authCallbackResolver: ResolveFn<RedirectCommand> = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const error = route.queryParams['error'];
  if (error) {
    console.error(error);
    return new RedirectCommand(router.parseUrl('/forbidden'));
  }
  const code = route.queryParams['code'];
  const isAuthenticated = await authService.getAuthToken(code);
  if (!isAuthenticated) {
    return new RedirectCommand(router.parseUrl('/forbidden'));
  }

  return new RedirectCommand(router.parseUrl(''));
};
