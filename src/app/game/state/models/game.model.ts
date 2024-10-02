import { Guess } from '../../models/guess';
import { Solution } from './solution.model';

export interface Game {
  guesses: Guess[],
  numberOfGuesses: number,
  isPlayingMusic: boolean,
  solution: Solution
}
