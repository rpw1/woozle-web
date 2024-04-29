import { GameActions } from '../actions/game.actions';
import * as models from '../models/game.model';
import * as fromReducer from './game.reducer';

describe('GameReducer', () => {
  describe('addGuess', () => {
    it('should increment guesses by one', () => {
      const { initialState } = fromReducer;
      const state = fromReducer.GameReducer(initialState, GameActions.addGuess);
      expect(state.guesses).toBe(1);
    });
  });

  describe('reset', () => {
    it('should reset game state to its initial state', () => {
      const initialState: models.Game = {
        guesses: 6,
        isPlayingMusic: true
      };
  
      const state = fromReducer.GameReducer(initialState, GameActions.reset);
  
      expect(state).toEqual(fromReducer.initialState);
    });
  });

  describe('togglePlayer', () => {
    it('should toggle the player from false to true', () => {
      const initialState: models.Game = {
        guesses: 0,
        isPlayingMusic: false
      };

      const state = fromReducer.GameReducer(initialState, GameActions.togglePlayer);
  
      expect(state.isPlayingMusic).toEqual(true);
    });

    it('should toggle the player from true to false', () => {
      const initialState: models.Game = {
        guesses: 0,
        isPlayingMusic: true
      };

      const state = fromReducer.GameReducer(initialState, GameActions.togglePlayer);
  
      expect(state.isPlayingMusic).toEqual(false);
    });
  });
})