import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  enableProdMode,
  isDevMode,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { httpResponseInterceptor } from './app/shared/interceptors/http-response.interceptor';
import { loadingSpinnerInterceptor } from './app/shared/interceptors/loading-spinner.interceptor';
import { spotifyAuthInterceptor } from './app/shared/interceptors/spotify-auth.interceptor';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([
      loadingSpinnerInterceptor,
      spotifyAuthInterceptor, 
      httpResponseInterceptor
    ])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}).catch((e) => console.error(e));
