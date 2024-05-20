import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { Game } from '../models/game.model';
import { selectGameState } from '../selectors/game.selector';

@Injectable()
export class GameEffects {
  private action$ = inject(Actions);
  private gameStore = inject(Store<Game>);

  addGuess$ = createEffect(() => this.action$
    .pipe(
      ofType(GameActions.addGuess),
      concatMap(async () => {
        const state = this.gameStore.selectSignal(selectGameState);
        return GameActions.togglePlayerOn({
          tasks: 1 + (!state().isPlayingMusic ? state().numberOfGuesses : 0)
        });
      })
    ));

  togglePlayer$ = createEffect(() => this.action$
    .pipe(
      ofType(GameActions.togglePlayer),
      exhaustMap(async () => {
        const state = this.gameStore.selectSignal(selectGameState);
          if (!state().isPlayingMusic) {
            return GameActions.togglePlayerOn({
              tasks: state().numberOfGuesses
            });
          }
          return GameActions.togglePlayerOff();
      })
    ));

  turnOffPlayer$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.completeAllTasks),
      exhaustMap(async () => {
        return GameActions.togglePlayerOff();
      })
    ))
}


