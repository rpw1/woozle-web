import { TaskStateType } from './queue-state-type.model';

export interface ProgressBarQueue {
  queuedTasks: number,
  activeItemState: TaskStateType | undefined,
  successiveTasksRan: number
}
