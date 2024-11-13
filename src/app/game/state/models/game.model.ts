import { Guess } from '../../models/guess';
import { ContentState } from './content-state';
import { Device } from './device';
import { GameState } from './game-state.model';
import { Track } from './track';

export interface Game {
  guesses: Guess[],
  numberOfGuesses: number,
  isPlayingMusic: boolean,
  currentGameState: GameState
  solution: Track,
  contentState: ContentState
  device: Device
}
