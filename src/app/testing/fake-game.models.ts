import { GuessType } from '../game/models/guess-type';
import { Game } from '../game/state/models/game.model'
import { ProgressBarQueue } from '../game/state/models/progress-bar-queue.model';
import { TaskStateType } from '../game/state/models/queue-state-type.model';


export function getFakeGame(): Game {
  return {
    numberOfGuesses: 4,
    isPlayingMusic: false,
    guesses: [
      { song: 'SKIPPED', type: GuessType.SKIP },
      { song: 'SKIPPED', type: GuessType.SKIP },
      { song: 'guess 3', type: GuessType.GUESS },
      { song: 'guess 4', type: GuessType.GUESS },
      { type: GuessType.UNKNOWN },
      { type: GuessType.UNKNOWN }
    ]
  };
}

export function getFakeProgressBarQueue(): ProgressBarQueue {
  return {
    queuedTasks: 1,
    activeItemState: TaskStateType.RUNNING,
    successiveTasksRan: 1
  }
}
