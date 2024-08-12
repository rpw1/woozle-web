import { createReducer, on } from '@ngrx/store';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { TaskStateType } from '../models/queue-state-type.model';

export const initialState: ProgressBarQueue = {
  queuedTasks: 0,
  activeItemState: undefined,
  successiveTasksRan: 0
}

export const QueueStateReducer = createReducer<ProgressBarQueue>(
  initialState,
  on(ProgressBarQueueActions.completeTask, (state) => ({
    ...state,
    activeItemState: TaskStateType.COMPLETED,
    successiveTasksRan: state.successiveTasksRan + 1
  })),

  on(ProgressBarQueueActions.queueTask, (state, { tasks }) => {
    tasks = tasks < 0 ? 0 : tasks;

    return {
      ...state,
      queuedTasks: state.queuedTasks + tasks
  }}),

  on(ProgressBarQueueActions.resetTasks, () => ({
    ...initialState,
    activeItemState: TaskStateType.RESET
  })),

  on(ProgressBarQueueActions.startTask, (state) => ({
    ...state,
    queuedTasks: state.queuedTasks - 1,
    activeItemState: TaskStateType.STARTED,
  })),

  on(ProgressBarQueueActions.runningTask, (state) => ({
    ...state,
    activeItemState: TaskStateType.RUNNING,
  })),

  on(ProgressBarQueueActions.noOperation, (state) => (state))
);
