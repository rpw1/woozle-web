import { Guess } from '../../models/guess';
import { GameState } from './game-state.model';
import { Solution } from './solution.model';

export interface Game {
  guesses: Guess[],
  numberOfGuesses: number,
  isPlayingMusic: boolean,
  currentGameState: GameState
  solution: Solution
}
