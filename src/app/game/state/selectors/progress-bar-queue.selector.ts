import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';

export const selectQueueState = createFeatureSelector<ProgressBarQueue>('progressBarQueue');

export const selectActiveTask = createSelector(
  selectQueueState,
  (queueState: ProgressBarQueue) => queueState.activeTask
);

export const selectQueuedTasks = createSelector(
  selectQueueState,
  (queueState: ProgressBarQueue) => queueState.queuedTasks
);
