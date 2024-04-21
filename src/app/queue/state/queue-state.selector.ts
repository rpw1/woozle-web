import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueueState } from './queue-state.model';
import { deepClone } from 'fast-json-patch';

export const getQueueState = createFeatureSelector<QueueState>('queueState');

export const shiftQueue = createSelector(
  getQueueState,
  (state: QueueState) => (deepClone(state))
)