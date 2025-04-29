import { v4 } from 'uuid';
import { GameConstants } from '../models/game-constants';
import { Game } from './models/game.model';
import { GuessType } from '../models/guess-type';
import { GameState } from './models/game-state.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
import { PlayerService } from '../services/player.service';
import { SolutionModalService } from '../services/solution-modal.service';
import { Guess } from '../models/guess';
import { firstValueFrom } from 'rxjs';
import { ProgressBarQueueStore } from './progress-bar-queue.state';

const maximumGuesses = GameConstants.SECONDS_ARRAY.length;
const initialState: Game = {
  guesses: GameConstants.SECONDS_ARRAY.map(() => ({
    id: v4(),
    type: GuessType.UNKNOWN,
  })),
  currentGameState: GameState.ACTIVE,
  numberOfGuesses: 0,
  isPlayingMusic: false,
  solution: {
    id: '',
    name: '',
    artist: '',
    trackUri: '',
    image: {
      url: '',
    },
  },
  solutions: [],
  solutionIndex: 0,
  deviceId: undefined,
};

export const GameStore = signalStore(
  withState(initialState),
  withComputed(({ solution }) => ({
    solutionName: computed(() =>
      `${solution().name} - ${solution().artist}`.toLocaleLowerCase()
    ),
  })),
  withMethods(
    (
      store,
      spotifyService = inject(SpotifyService),
      playerService = inject(PlayerService),
      solutionModalService = inject(SolutionModalService),
      progressBarQueueStore = inject(ProgressBarQueueStore)
    ) => ({
      async addGuess(guess: Guess): Promise<void> {
        patchState(store, {
          guesses: [
            ...store.guesses().slice(0, store.numberOfGuesses()),
            guess,
            ...store.guesses().slice(store.numberOfGuesses() + 1),
          ],
          numberOfGuesses: store.numberOfGuesses() + 1,
        });

        if (guess.song?.toLocaleLowerCase() === store.solutionName()) {
          await this.updateGameState(GameState.WON);
          return;
        }

        if (store.numberOfGuesses() === maximumGuesses) {
          await this.updateGameState(GameState.LOSS);
          return;
        }

        if (!store.isPlayingMusic()) {
          await this.togglePlayerOn();
        }

        progressBarQueueStore.queueTasks(1);
      },
      async updateGameState(gameState: GameState): Promise<void> {
        await solutionModalService.open();
        patchState(store, { currentGameState: gameState });

        if (store.currentGameState() === GameState.WON || store.currentGameState() === GameState.LOSS) {
          this.togglePlayerOn();
        }
      },
      async togglePlayerOn(): Promise<void> {
        patchState(store, { isPlayingMusic: true });
        await firstValueFrom(
          spotifyService.playPlayer(store.solution().trackUri),
          { defaultValue: false }
        );
        playerService.setPlayerActiveElement();
        progressBarQueueStore.queueTasks(store.numberOfGuesses());
      },
    })
  )
);
