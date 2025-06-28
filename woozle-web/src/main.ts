import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  enableProdMode,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { httpResponseInterceptor } from './app/shared/interceptors/http-response.interceptor';
import { spotifyAuthInterceptor } from './app/shared/interceptors/spotify-auth.interceptor';
import {
  initApp,
  SettingsService,
} from './app/shared/services/settings.service';
import { environment } from './environments/environment';
import { loadingSpinnerInterceptor } from './app/shared/interceptors/loading-spinner.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAppInitializer(async () => {
      const initializerFn = initApp(inject(SettingsService));
      return await initializerFn();
    }),
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
