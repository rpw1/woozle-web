import { Game } from '../models/game.model'
import * as selectors from './game.selector';

describe('GameSelectors', () => {
  let initialState: Game;
  beforeEach(() => {
    initialState = {
      guesses: 0,
      isPlayingMusic: false
    }
  });

  it('should get game state', () => {
    const result = selectors.getGame.projector(initialState);

    expect(result).toEqual(result);
  });

  it('should get number of guesses', () => {
    const result = selectors.selectGuesses.projector(initialState);

    expect(result).toBe(initialState.guesses);
  });

  it('should get game state', () => {
    const result = selectors.selectIsPlayingMusic.projector(initialState);

    expect(result).toBe(initialState.isPlayingMusic);
  });
});