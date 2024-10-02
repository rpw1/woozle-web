import { createReducer, on } from "@ngrx/store";
import { Game } from "../models/game.model";
import { GameActions } from '../actions/game.actions';
import { deepClone } from 'fast-json-patch';
import { GameConstants } from '../../models/game-constants';
import { GuessType } from '../../models/guess-type';
import { v4 } from 'uuid';

export const maximumGuesses = GameConstants.SECONDS_ARRAY.length;
export const initialState: Game = {
  guesses: GameConstants.SECONDS_ARRAY.map(() => ({
    id: v4(),
    type: GuessType.UNKNOWN
  })),
  numberOfGuesses: 0,
  isPlayingMusic: false,
  solution: {
    song: 'song',
    artist: 'artist',
    album: 'album'
  }
}

export const GameReducer = createReducer<Game>(
  initialState,
  on(GameActions.addGuess, (state, { guess }) => {
    if (state.numberOfGuesses === maximumGuesses) {
      return state;
    }

    const newState : Game = {
      ...state,
      guesses: [
        ...state.guesses.slice(0, state.numberOfGuesses),
        guess,
        ...state.guesses.slice(state.numberOfGuesses + 1)
      ],
      numberOfGuesses: state.numberOfGuesses + 1
    }
    return deepClone(newState);
  }),
  on(GameActions.reset, () => (deepClone(initialState))),
  on(GameActions.togglePlayerOn, (state) => (deepClone({...state, isPlayingMusic: true}))),
  on(GameActions.togglePlayerOff, (state) => (deepClone({...state, isPlayingMusic: false})))
)
