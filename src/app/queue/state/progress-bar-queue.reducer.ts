import { createReducer, on } from '@ngrx/store';
import { deepClone } from 'fast-json-patch';
import { ProgressBarQueue } from './progress-bar-queue.model';
import { ProgressBarQueueActions } from './progress-bar-queue.actions';

export const initialState: ProgressBarQueue = {
  queuedTasks: 0,
  activeTask: false
}

export const QueueStateReducer = createReducer<ProgressBarQueue>(
  initialState,
  on(ProgressBarQueueActions.completeTask, (state) => {
    state.activeTask = false;

    return deepClone(state);
  }),

  on(ProgressBarQueueActions.queueTask, (state, { tasks }) => {
    if (tasks <= 0) {
      return state;
    }
    state.queuedTasks += tasks;

    return deepClone(state);
  }),

  on(ProgressBarQueueActions.resetTasks, () => (deepClone(initialState))
  ),

  on(ProgressBarQueueActions.startTask, (state) => {
    state.queuedTasks -= 1;
    state.activeTask = true;

    return deepClone(state);
  }),
);