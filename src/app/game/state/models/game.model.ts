import { Guess } from '../../models/guess';

export interface Game {
  guesses: Guess[],
  numberOfGuesses: number,
  isPlayingMusic: boolean,
}
