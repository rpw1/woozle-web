import { deepClone } from 'fast-json-patch';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../actions/game.actions';
import { Game } from '../models/game.model';
import * as fromReducer from './game.reducer';
import { GameState } from '../models/game-state.model';

describe('GameReducer', () => {
  const state : Game = {
    numberOfGuesses: 6,
    isPlayingMusic: true,
    guesses: [
      {id: 'id1', song: 'song 1', type: GuessType.GUESS},
      {id: 'id2', song: 'SKIPPED', type: GuessType.SKIP},
      {id: 'id3', song: '', type: GuessType.UNKNOWN},
      {id: 'id4', song: '', type: GuessType.UNKNOWN},
      {id: 'id5', song: '', type: GuessType.UNKNOWN},
      {id: 'id6', song: '', type: GuessType.UNKNOWN},
    ],
    currentGameState: GameState.ACTIVE,
    solution: {
      song: 'Garden Song',
      album: 'Punisher',
      artist: 'Phoebe Bridgers',
      songUri: 'uri'
    }
  }

  describe('addGuess', () => {
    it('should increment guesses by one', () => {
      const { initialState } = fromReducer;
      const result = fromReducer.GameReducer(
        initialState,
        GameActions.addGuess({guess:{id: 'id1', song: 'song 1', type: GuessType.GUESS}})
      );
      expect(result.guesses[0]).toEqual({id: 'id1', song: 'song 1', type: GuessType.GUESS});
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
