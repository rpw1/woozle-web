import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Game } from "../models/game.model";

export const getGame = createFeatureSelector<Game>('game');

export const selectGuesses = createSelector(
  getGame,
  (state: Game) => state.guesses
);

export const selectIsPlayingMusic = createSelector(
  getGame,
  (state: Game) => state.isPlayingMusic
);