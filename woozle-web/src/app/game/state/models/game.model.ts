import { GoodTrack } from '../../content/state/models/good-content';
import { Guess } from '../../models/guess';
import { GameState } from './game-state.model';

export interface Game {
  guesses: Guess[];
  numberOfGuesses: number;
  isPlayingMusic: boolean;
  currentGameState: GameState;
  solution: GoodTrack;
  solutions: GoodTrack[];
  solutionIndex: number;
  deviceId?: number;
}
