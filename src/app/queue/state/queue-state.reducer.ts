import { createReducer, on } from '@ngrx/store';
import { QueueState } from './queue-state.model';
import { addQueueState, removeQueueState, resetQueueState } from './queue-state.actions';
import { deepClone } from 'fast-json-patch';

export const initialState: QueueState = {
  queue: []
}

export const QueueStateReducer = createReducer<QueueState>(
  initialState,
  on(addQueueState, (state: QueueState, { task }) => {
    state.queue.push(task);
    return deepClone(state);
  }),
  on(removeQueueState, (state: QueueState) => {
    state.queue = state.queue.slice(1); 
    return state; // slice returns a copy of the array, thus not needing deepClone
  }),
  on(resetQueueState, () => ({...initialState}))
);