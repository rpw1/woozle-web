import { Guess } from '../../models/guess';
import { GameState } from './game-state.model';

export interface Game {
  guesses: Guess[];
  numberOfGuesses: number;
  currentGameState: GameState;
}
