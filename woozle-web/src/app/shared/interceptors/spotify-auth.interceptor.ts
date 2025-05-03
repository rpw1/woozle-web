import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SpotifyService } from '../../woozle/services/spotify.service';

export const RequiresAuthorization = 
  new HttpContextToken<boolean>(() => true);

export const spotifyAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(RequiresAuthorization)) {
    return next(req);
  }

  if (req.url.includes(SpotifyService.SPOTIFY_BASE_URL)) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token') ?? ''}`
      ),
    });
  }

  const settingsService = inject(SettingsService);

  if (!settingsService.settings) {
    return next(req);
  }

  if (
    req.url.includes(`${settingsService.settings().woozleApiBaseUrl}`)
  ) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        localStorage.getItem('access_token') ?? ''
      ),
    });
  }
  return next(req);
};
