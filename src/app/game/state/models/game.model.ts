import { Guess } from '../../models/guess';
import { Device } from './device';
import { GameState } from './game-state.model';
import { Playlist } from './playlist';
import { Track } from './track';

export interface Game {
  guesses: Guess[],
  numberOfGuesses: number,
  isPlayingMusic: boolean,
  currentGameState: GameState
  solution: Track,
  playlist: Playlist,
  device: Device
}
