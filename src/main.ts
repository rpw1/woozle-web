import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { GameEffects } from './app/game/state/effects/game.effects';
import { ProgressBarQueueEffects } from './app/game/state/effects/progress-bar-queue.effects';
import { GameReducer } from './app/game/state/reducers/game.reducer';
import { QueueStateReducer } from './app/game/state/reducers/progress-bar-queue.reducer';
import { routes } from './app/app-routes';
import { SettingsService } from './app/shared/services/settings.service';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({
      game: GameReducer,
      progressBarQueue: QueueStateReducer
    }),
    provideEffects([
      GameEffects,
      ProgressBarQueueEffects
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: false,
      trace: true,
      traceLimit: 75,
      connectInZone: true
    }),
    provideHttpClient()
]
}).catch(e => console.error(e));
