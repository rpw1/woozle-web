import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueueState } from './queue-state.model';
import { deepClone } from 'fast-json-patch';
import { WoozleTaskState } from '../models/woozle-task-state';

export const getQueueState = createFeatureSelector<QueueState>('queueState');
