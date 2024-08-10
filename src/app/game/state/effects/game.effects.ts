import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { Game } from '../models/game.model';
import { selectGameState } from '../selectors/game.selector';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class GameEffects {
  private action$ = inject(Actions);
  private gameStore = inject(Store<Game>);

  addGuess$ = createEffect(() => this.action$
    .pipe(
      ofType(GameActions.addGuess),
      concatLatestFrom(() => this.gameStore.select(selectGameState)),
      concatMap(async ([_, gameState]) => {
        return GameActions.togglePlayerOn({
          tasks: 1 + (!gameState.isPlayingMusic ? gameState.numberOfGuesses : 0)
        });
      })
    ));

  togglePlayer$ = createEffect(() => this.action$
    .pipe(
      ofType(GameActions.togglePlayer),
      concatLatestFrom(() => this.gameStore.select(selectGameState)),
      exhaustMap(async ([_, gameState]) => {
          if (!gameState.isPlayingMusic) {
            return GameActions.togglePlayerOn({
              tasks: gameState.numberOfGuesses + 1
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


