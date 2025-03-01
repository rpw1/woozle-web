import { ProgressBarQueue } from '../game/state/models/progress-bar-queue.model';

export function getFakeProgressBarQueue() : ProgressBarQueue {
  return {
    activeItemState: undefined,
    queuedTasks: 0,
    successiveTasksRan: 0,
  }
}
