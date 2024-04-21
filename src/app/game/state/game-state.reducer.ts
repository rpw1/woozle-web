import { createReducer, on } from "@ngrx/store";
import { resetGameState, setGameState } from "./game-state.actions";
import { GameState } from "./game-state.model";

export const initialState: GameState = {
  guessCount: 0,
  isPlayingMusic: false
}

export const GameStateReducer = createReducer<GameState>(
  initialState,
  on(setGameState, (state: GameState) => ({...state})),
  on(resetGameState, () => ({...initialState}))
)