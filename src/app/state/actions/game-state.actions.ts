import { createAction } from "@ngrx/store";

export enum GameStateActionType {
  SET_GAME_STATE = '[Global Game State] Set',
  RESET_GAME_STATE = '[Global Game State] Reset'
}

export const setGameState = createAction(GameStateActionType.SET_GAME_STATE);
export const resetGameState = createAction(GameStateActionType.RESET_GAME_STATE);