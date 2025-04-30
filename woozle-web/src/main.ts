import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  enableProdMode,
  inject,
  isDevMode,
  provideAppInitializer,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { TracksStore } from './app/game/content/state/tracks.state';
import { spotifyAuthInterceptor } from './app/shared/interceptors/spotify-auth.interceptor';
import {
  initApp,
  SettingsService,
} from './app/shared/services/settings.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAppInitializer(async () => {
      const initializerFn = initApp(inject(SettingsService));
      return await initializerFn();
    }),
    provideHttpClient(withInterceptors([spotifyAuthInterceptor])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    TracksStore,
  ],
}).catch((e) => console.error(e));
