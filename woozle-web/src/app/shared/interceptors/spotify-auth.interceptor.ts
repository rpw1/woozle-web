import { HttpInterceptorFn } from '@angular/common/http';
import { SpotifyService } from '../services/spotify.service';

export const spotifyAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(SpotifyService.SPOTIFY_BASE_URL)) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token') ?? ''}`)
    });

  }
  return next(req);
};
