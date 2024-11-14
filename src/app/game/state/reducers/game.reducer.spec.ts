import { deepClone } from 'fast-json-patch';
import { getFakeGame } from '../../../testing/fake-game.models';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../actions/game.actions';
import { Game } from '../models/game.model';
import * as fromReducer from './game.reducer';

describe('GameReducer', () => {
  const state : Game = getFakeGame()

  describe('addGuess', () => {
    it('should increment guesses by one', () => {
      const result = fromReducer.GameReducer(
        state,
        GameActions.addGuess({guess:{id: 'id1', song: 'song 1', type: GuessType.GUESS}})
      );
      expect(result.guesses[result.numberOfGuesses - 1]).toEqual({id: 'id1', song: 'song 1', type: GuessType.GUESS});
      expect(result.numberOfGuesses).toBe(5);
    });
  });

  describe('reset', () => {
    it('should reset game state to its initial state', () => {
      const result = fromReducer.GameReducer(state, GameActions.reset);
      expect(result).toEqual({ ...fromReducer.initialState, device: state.device });
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
