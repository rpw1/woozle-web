import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "../models/global-state.model";
import { resetGameState, setGameState } from "../actions/game-state.actions";

export const initialState: GlobalState = {
  gameState: {
    guessCount: 0,
    isPlayingMusic: false
  }
}

export const GlobalReducer = createReducer<GlobalState>(
  initialState,
  on(setGameState, (state: GlobalState) => state),
  on(resetGameState, () => initialState)
)