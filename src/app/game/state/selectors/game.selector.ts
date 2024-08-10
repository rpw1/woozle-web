import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Game } from "../models/game.model";

export const selectGameState = createFeatureSelector<Game>('game');

export const selectGuesses = createSelector(
  selectGameState,
  (state: Game) => state.guesses
);

export const selectGuessIndex = createSelector(
  selectGameState,
  (state: Game) => state.guessIndex
);

export const selectIsPlayingMusic = createSelector(
  selectGameState,
  (state: Game) => state.isPlayingMusic
);