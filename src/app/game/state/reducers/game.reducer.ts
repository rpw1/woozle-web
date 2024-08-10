import { createReducer, on } from "@ngrx/store";
import { Game } from "../models/game.model";
import { GameActions } from '../actions/game.actions';
import { GameConstants } from '../../models/game-constants';
import { GuessType } from '../../models/guess-type';

export const initialState: Game = {
  guesses: GameConstants.SECONDS_ARRAY.map(x => {
    return {
      type: GuessType.UNKNOWN
    }
  }),
  guessIndex: 0,
  isPlayingMusic: false
}

export const GameReducer = createReducer<Game>(
  initialState,
  on(GameActions.addGuess, (state, { guess }) => ({ 
    ...state, 
    guesses: [...state.guesses.slice(0, state.guessIndex), guess, ...state.guesses.slice(state.guessIndex + 1)],
    guessIndex: state.guessIndex + 1,
    isPlayingMusic: true,
  })),
  on(GameActions.reset, () => ({ ...initialState })),
  on(GameActions.togglePlayer, (state) => ({ ...state, isPlayingMusic: !state.isPlayingMusic }))
)