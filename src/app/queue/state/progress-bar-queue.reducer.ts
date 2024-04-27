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
  on(ProgressBarQueueActions.queue, (state: ProgressBarQueue, { tasks }) => {
    state.queuedTasks += tasks;

    if (!state.activeTask) {
      state.queuedTasks -= 1;
      state.activeTask = true;
    }

    return deepClone(state);
  }),
  on(ProgressBarQueueActions.start, (state: ProgressBarQueue) => {
    if (state.queuedTasks === 0 || state.activeTask) {
      return;
    }

    state.queuedTasks -= 1;
    state.activeTask = true;
    return deepClone(state);
  }),
  on(ProgressBarQueueActions.reset, () => (deepClone(initialState)))
);