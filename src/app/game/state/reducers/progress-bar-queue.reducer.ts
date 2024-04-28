import { createReducer, on } from '@ngrx/store';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';

export const initialState: ProgressBarQueue = {
  queuedTasks: 0,
  activeTask: false
}

export const QueueStateReducer = createReducer<ProgressBarQueue>(
  initialState,
  on(ProgressBarQueueActions.completeTask, (state) => (
    { ...state, activeTask: false}
  )),

  on(ProgressBarQueueActions.queueTask, (state, { tasks }) => {
    if (tasks <= 0) {
      return state;
    }

    return { ...state, queuedTasks: state.queuedTasks + tasks,}
  }),

  on(ProgressBarQueueActions.resetTasks, () => (
    {...initialState}
  )),

  on(ProgressBarQueueActions.startTask, (state) => {
    return {
      queuedTasks: state.queuedTasks - 1,
      activeTask: true
    }
  }),
  on(ProgressBarQueueActions.wait, (state) => state)
);