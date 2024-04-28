import { createReducer, on } from "@ngrx/store";
import { Game } from "../models/game.model";
import { GameActions } from '../actions/game.actions';

export const initialState: Game = {
  guesses: 0,
  isPlayingMusic: false
}

export const GameReducer = createReducer<Game>(
  initialState,
  on(GameActions.addGuess, (state) => ({ ...state, guesses: state.guesses + 1 })),
  on(GameActions.reset, () => ({ ...initialState })),
  on(GameActions.togglePlayer, (state) => ({ ...state, isPlayingMusic: !state.isPlayingMusic }))
)