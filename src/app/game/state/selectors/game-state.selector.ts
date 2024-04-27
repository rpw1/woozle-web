import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "../models/game-state.model";

export const getGameState = createFeatureSelector<GameState>('gameState');

export const selectGameState = createSelector(
  getGameState,
  (state: GameState) => (state)
);