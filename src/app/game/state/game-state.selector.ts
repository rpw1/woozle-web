import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "./game-state.model";

export const getGlobalState = createFeatureSelector<GameState>('gameState');

export const selectGameState = createSelector(
  getGlobalState,
  (state: GameState) => (state)
);