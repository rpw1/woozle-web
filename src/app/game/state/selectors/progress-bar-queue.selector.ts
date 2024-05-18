import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';

export const selectQueueState = createFeatureSelector<ProgressBarQueue>('progressBarQueue');

export const selectActiveItemState = createSelector(
  selectQueueState,
  (queueState: ProgressBarQueue) => queueState.activeItemState
);

export const selectQueuedTasks = createSelector(
  selectQueueState,
  (queueState: ProgressBarQueue) => queueState.queuedTasks
);

export const selectActiveIndex = createSelector(
  selectQueueState,
  (queueState: ProgressBarQueue) => queueState.activeIndex
);