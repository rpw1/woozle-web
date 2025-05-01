import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SpotifyIdentityService } from '../services/spotify-identity.service';
import { ToastService } from '../services/toast.service';

export const httpResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const injector = inject(Injector);
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError(async (error, caught) => {
      if (error instanceof HttpErrorResponse) {
        switch(error.status) {
          case HttpStatusCode.Unauthorized:
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
              void router.navigate(['/forbidden']);
              return error;
            }
            const spotifyIdentityService = injector.get(SpotifyIdentityService);
            const isAuthenticated = await spotifyIdentityService.refreshAccessToken({
              refreshToken: refreshToken,
            });

            if (isAuthenticated) {
              toastService.showSuccess('Successfully authenticated, please try again.');
            } else {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
            }

            void router.navigate(['/home']);
            break;
        }
      }

      return error;
    })
  )
};