import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ProgressBarQueueEffects } from './app/game/state/effects/progress-bar-queue.effects';
import { QueueStateReducer } from './app/game/state/reducers/progress-bar-queue.reducer';
import { GameReducer } from './app/game/state/reducers/game.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom, isDevMode } from '@angular/core';

const routes: Routes = [
  {
    path: '**', 
    redirectTo: 'AppComponent',
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({
      game: GameReducer,
      progressBarQueue: QueueStateReducer
    }),
    provideEffects([ProgressBarQueueEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: false,
      trace: true,
      traceLimit: 75,
      connectInZone: true
    })
]
}).catch(e => console.error(e));