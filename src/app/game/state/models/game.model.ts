import { Guess } from '../../models/guess';

export interface Game {
  guesses: Guess[],
  guessIndex: number,
  isPlayingMusic: boolean,
}