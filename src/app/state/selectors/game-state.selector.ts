import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalState } from "../models/global-state.model";

export const getGlobalState = createFeatureSelector<GlobalState>('globalState');

export const selectGameState = createSelector(
  getGlobalState,
  (state: GlobalState) => (state.gameState)
);