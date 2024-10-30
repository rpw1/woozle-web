import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Game } from "../models/game.model";

export const selectGameState = createFeatureSelector<Game>('game');

export const selectNumberOfGuesses = createSelector(
  selectGameState,
  (state: Game) => state.numberOfGuesses
);

export const selectGuesses = createSelector(
  selectGameState,
  (state: Game) => state.guesses
);

export const selectIsPlayingMusic = createSelector(
  selectGameState,
  (state: Game) => state.isPlayingMusic
);

export const selectCurrentGameState = createSelector(
  selectGameState,
  (state: Game) => state.currentGameState
);

export const selectSolution = createSelector(
  selectGameState,
  (state: Game) => state.solution
);

export const selectPlaylist = createSelector(
  selectGameState,
  (state: Game) => state.playlist
)
