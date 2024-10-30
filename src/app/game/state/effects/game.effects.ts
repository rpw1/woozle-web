import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, concatMap, exhaustMap, filter, firstValueFrom } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { Game } from '../models/game.model';
import { selectGameState } from '../selectors/game.selector';
import { concatLatestFrom } from '@ngrx/operators';
import { maximumGuesses } from '../reducers/game.reducer';
import { GameState } from '../models/game-state.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionModalComponent } from '../../components/solution-modal/solution-modal.component';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { selectActiveItemState } from '../selectors/progress-bar-queue.selector';
import { TaskStateType } from '../models/queue-state-type.model';

@Injectable()
export class GameEffects {
  private readonly action$ = inject(Actions);
  private readonly modalService = inject(NgbModal);
  private readonly gameStore = inject(Store<Game>);
  private readonly progressBarQueueStore = inject(Store<ProgressBarQueue>);
  private readonly spotifyService = inject(SpotifyService);

  readonly addGuess$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.addGuess),
      concatLatestFrom(() => this.gameStore.select(selectGameState)),
      concatMap(async ([guess, gameState]) => {
        if (guess.guess.song?.toLocaleLowerCase() === gameState.solution.song.toLocaleLowerCase()) {
          this.modalService.open(SolutionModalComponent);
          return GameActions.updateGameState({
            newGameState: GameState.WON
          });
        }
        if (gameState.numberOfGuesses === maximumGuesses) {
          this.modalService.open(SolutionModalComponent);
          return GameActions.updateGameState({
            newGameState: GameState.LOSS
          });
        }
        return GameActions.togglePlayerOn({
          tasks: 1 + (!gameState.isPlayingMusic ? gameState.numberOfGuesses : 0)
        });
      })
    )
  );

  readonly gameEndState$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.updateGameState),
      filter(x => x.newGameState === GameState.WON || x.newGameState === GameState.LOSS),
      exhaustMap(async () => {
        return GameActions.togglePlayerOn({
          tasks: maximumGuesses
        });
      })
    )
  );

  readonly togglePlayer$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.togglePlayer),
      concatLatestFrom(() => this.gameStore.select(selectGameState)),
      concatMap(async ([_, gameState]) => {
        if (!gameState.isPlayingMusic) {
          return GameActions.togglePlayerOn({
            tasks: gameState.numberOfGuesses + 1
          });
        }
        return GameActions.togglePlayerOff();
      })
    )
  );

  readonly turnOffPlayer$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProgressBarQueueActions.completeAllTasks),
      exhaustMap(async () => {
        return GameActions.togglePlayerOff();
      })
    )
  );

  readonly playPlayer$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.togglePlayerOn),
      concatLatestFrom(() => combineLatest([this.gameStore.select(selectGameState), this.progressBarQueueStore.select(selectActiveItemState)])),
      exhaustMap(async ([_, [gameState, queueState]]) => {
        if (queueState !== TaskStateType.RUNNING) {
          const devices = (await firstValueFrom(this.spotifyService.getAvailableDevices())).devices as any[];
          await firstValueFrom(this.spotifyService.playPlayer(devices[0].id, gameState.solution.songUri), {defaultValue: false});
        }
        return ProgressBarQueueActions.noOperation();
      })
    )
  );

  readonly pausePlayer$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.togglePlayerOff),
      exhaustMap(async () => {
        await firstValueFrom(this.spotifyService.pausePlayer(), {defaultValue: false});
        return ProgressBarQueueActions.noOperation();
      })
    )
  );

  readonly resetGame$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.reset),
      exhaustMap(async () => {
        return GameActions.setGameSolution();
      })
    )
  );
}
