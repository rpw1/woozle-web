import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SpotifyIdentityService } from '../shared/services/spotify-identity.service';

export const authCallbackResolver: ResolveFn<RedirectCommand> = async (
  route,
  _
) => {
  const router = inject(Router);
  const spotifyIdentityService = inject(SpotifyIdentityService);
  const error = route.queryParams['error'];
  if (error) {
    console.error(error);
    return new RedirectCommand(router.parseUrl('/forbidden'));
  }

  const isAuthenticated = spotifyIdentityService.requestAccessToken(
    route.queryParams['code']
  );

  if (!isAuthenticated) {
    return new RedirectCommand(router.parseUrl('/forbidden'));
  }

  return new RedirectCommand(router.parseUrl(''));
};
