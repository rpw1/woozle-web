import { createReducer, on } from "@ngrx/store";
import { Game } from "../models/game.model";
import { GameActions } from '../actions/game.actions';
import { deepClone } from 'fast-json-patch';
import { GameConstants } from '../../models/game-constants';
import { GuessType } from '../../models/guess-type';
import { v4 } from 'uuid';
import { GameState } from '../models/game-state.model';

export const maximumGuesses = GameConstants.SECONDS_ARRAY.length;
export const initialState: Game = {
  guesses: GameConstants.SECONDS_ARRAY.map(() => ({
    id: v4(),
    type: GuessType.UNKNOWN
  })),
  currentGameState: GameState.ACTIVE,
  numberOfGuesses: 0,
  isPlayingMusic: false,
  solution: {
    song: '',
    artist: '',
    album: '',
    songUri: '',
    imageUri: ''
  },
  playlist: {
    playlistId: '',
    name: '',
    tracks: []
  },
  device: {
    id: '',
    isActive: false,
    name: '',
    type: ''
  }
}

export const GameReducer = createReducer<Game>(
  initialState,
  on(GameActions.addGuess, (state, { guess }) => {
    if (state.currentGameState !== GameState.ACTIVE) {
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
  on(GameActions.reset, (state) => ({ ...initialState, playlist: state.playlist, device: state.device })),
  on(GameActions.togglePlayerOn, (state) => ({...state, isPlayingMusic: true})),
  on(GameActions.togglePlayerOff, (state) => ({...state, isPlayingMusic: false})),
  on(GameActions.updateGameState, (state, { newGameState }) => {
    if (newGameState === GameState.WON || newGameState === GameState.LOSS) {
      return { ...state, currentGameState: newGameState, numberOfGuesses: maximumGuesses };
    }
    return { ...state, currentGameState: newGameState };
  }),
  on(GameActions.setGameSolution, (state) => {
    if (state.playlist.tracks.length === 0) {
      return state
    }

    const randomIndex = Math.floor(Math.random() * state.playlist.tracks.length) -1;
    return { ...state, solution: state.playlist.tracks[randomIndex] }
  }),
  on(GameActions.loadPlaylist, (state, action) => {
    return { 
      ...state, 
      playlist: { 
        ...state.playlist, 
        playlistId: action.playlist.id, 
        name: action.playlist.name 
      } 
    }
  }),
  on(GameActions.loadPlaylistSuccess, (state, action) => {
    return { 
      ...state, 
      playlist: { 
        ...state.playlist, 
        tracks: action.tracks 
      } 
    }
  }),
  on(GameActions.loadDevice, (state, action) => {
    return { 
      ...state, 
      device: { 
        ...state.device,
        playlistId: action.device.id, 
        isActive: action.device.is_active,
        name: action.device.name ,
        type: action.device.type
      } 
    }
  }),
)
