import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap, filter, firstValueFrom, map, switchMap } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { SolutionModalComponent } from '../../components/solution-modal/solution-modal.component';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { GameState } from '../models/game-state.model';
import { Game } from '../models/game.model';
import { maximumGuesses } from '../reducers/game.reducer';
import { selectGameState } from '../selectors/game.selector';

@Injectable()
export class GameEffects {
  private readonly action$ = inject(Actions);
  private readonly modalService = inject(NgbModal);
  private readonly gameStore = inject(Store<Game>);
  private readonly spotifyService = inject(SpotifyService);

  readonly addGuess$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.addGuess),
      concatLatestFrom(() => this.gameStore.select(selectGameState)),
      concatMap(async ([action, gameState]) => {
        if (action.guess.song?.toLocaleLowerCase() === gameState.solution.song.toLocaleLowerCase()) {
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
        if (!gameState.isPlayingMusic) {
          return GameActions.togglePlayerOn();
        } 

        return ProgressBarQueueActions.queueTask({ tasks: 1 });
      })
    )
  );

  readonly gameEndState$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.updateGameState),
      filter(x => x.newGameState === GameState.WON || x.newGameState === GameState.LOSS),
      exhaustMap(async () => {
        return GameActions.togglePlayerOn();
      })
    )
  );

  readonly togglePlayerOnChangeName$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.togglePlayerOn),
      concatLatestFrom(() => this.gameStore.select(selectGameState)),
      exhaustMap(async ([action, gameState]) => {
        await firstValueFrom(this.spotifyService.playPlayer(gameState.solution.songUri), { defaultValue: false });
        return GameActions.togglePlayerOnSuccess();
      })
    )
  );

  readonly turnOffPlayer$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProgressBarQueueActions.completeAllTasks),
      exhaustMap(async () => GameActions.togglePlayerOff())
    )
  );

  readonly pausePlayer$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.togglePlayerOff),
      exhaustMap(() => this.spotifyService.pausePlayer()),
      map(() => ProgressBarQueueActions.noOperation())
    )
  );

  readonly resetGame$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.reset),
      exhaustMap(async () => GameActions.setGameSolution())
    )
  );

  readonly loadPlaylist$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.loadPlaylist),
      switchMap((props) => this.spotifyService.loadPlaylistTracks(props.playlist.id)),
      map((tracks) => GameActions.loadPlaylistSuccess({ tracks: tracks }))
    )
  );

  readonly loadPlaylistSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.loadPlaylistSuccess),
      switchMap(async () => GameActions.setGameSolution()),
    )
  );

  readonly loadDevice$ = createEffect(() => 
    this.action$.pipe(
      ofType(GameActions.loadDevice),
      switchMap((props) => this.spotifyService.transferPlayback(props.device.id)),
      map(() => GameActions.loadDeviceSuccess())
    )
  );
}
