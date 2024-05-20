import { deepClone } from 'fast-json-patch';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../actions/game.actions';
import { Game } from '../models/game.model';
import * as fromReducer from './game.reducer';

describe('GameReducer', () => {
  const state : Game = {
    numberOfGuesses: 6,
    isPlayingMusic: true,
    guesses: [
      {song: 'song 1', type: GuessType.GUESS},
      {song: 'SKIPPED', type: GuessType.SKIP},
      {song: '', type: GuessType.UNKNOWN},
      {song: '', type: GuessType.UNKNOWN},
      {song: '', type: GuessType.UNKNOWN},
      {song: '', type: GuessType.UNKNOWN},
    ]
  }

  describe('addGuess', () => {
    it('should increment guesses by one', () => {
      const { initialState } = fromReducer;
      const result = fromReducer.GameReducer(
        initialState,
        GameActions.addGuess({guess:{song: 'song 1', type: GuessType.GUESS}})
      );
      expect(result.guesses[0]).toEqual({song: 'song 1', type: GuessType.GUESS});
      expect(result.numberOfGuesses).toBe(1);
    });
  });

  describe('reset', () => {
    it('should reset game state to its initial state', () => {
      const result = fromReducer.GameReducer(state, GameActions.reset);

      expect(result).toEqual(fromReducer.initialState);
    });
  });

  describe('togglePlayer', () => {
    it('should toggle the player from false to true', () => {
      const initialState: Game = deepClone(state);
      initialState.isPlayingMusic = false;

      const result = fromReducer.GameReducer(initialState, GameActions.togglePlayerOn);

      expect(result.isPlayingMusic).toEqual(true);
    });

    it('should toggle the player from true to false', () => {
      const initialState: Game = deepClone(state);
      initialState.isPlayingMusic = true;

      const result = fromReducer.GameReducer(initialState, GameActions.togglePlayerOff);

      expect(result.isPlayingMusic).toEqual(false);
    });
  });
})
