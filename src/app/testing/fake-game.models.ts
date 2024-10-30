import { GuessType } from '../game/models/guess-type';
import { GameState } from '../game/state/models/game-state.model';
import { Game } from '../game/state/models/game.model'
import { ProgressBarQueue } from '../game/state/models/progress-bar-queue.model';
import { TaskStateType } from '../game/state/models/queue-state-type.model';

export function getFakeGame(): Game {
  return {
    numberOfGuesses: 4,
    isPlayingMusic: false,
    guesses: [
      { id: 'id1', song: 'SKIPPED', type: GuessType.SKIP },
      { id: 'id2', song: 'SKIPPED', type: GuessType.SKIP },
      { id: 'id3', song: 'guess 3', type: GuessType.GUESS },
      { id: 'id4', song: 'guess 4', type: GuessType.GUESS },
      { id: 'id5', type: GuessType.UNKNOWN },
      { id: 'id6', type: GuessType.UNKNOWN }
    ],
    currentGameState: GameState.ACTIVE,
    solution: {
      song: 'Garden Song',
      album: 'Punisher',
      artist: 'Phoebe Bridgers',
      songUri: 'uri'
    },
    playlist: {
      playlistId: 'playlistId',
      name: 'name',
      tracks: [
        {
          song: 'song',
          album: 'album',
          artist: 'artist',
          songUri: 'songUri'
        }
      ]
    }
  };
}

export function getFakeProgressBarQueue(): ProgressBarQueue {
  return {
    queuedTasks: 1,
    activeItemState: TaskStateType.RUNNING,
    successiveTasksRan: 1
  }
}
