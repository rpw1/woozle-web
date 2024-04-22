import { createReducer, on } from '@ngrx/store';
import { deepClone } from 'fast-json-patch';
import { addQueueState, resetQueueState, shiftQueueState, updateActiveTask } from './queue-state.actions';
import { QueueState } from './queue-state.model';

export const initialState: QueueState = {
  queue: [],
  activeTask: undefined
}

export const QueueStateReducer = createReducer<QueueState>(
  initialState,
  on(addQueueState, (state: QueueState, { task }) => {
    state.queue.push(task);
    return deepClone(state);
  }),
  on(shiftQueueState, (state: QueueState) => {
    const task = state.queue.shift();
    state.activeTask = task;
    return deepClone(state);
  }),
  on(resetQueueState, () => (deepClone(initialState))),
  on(updateActiveTask, (state: QueueState, { taskState }) => {
    if (state.activeTask) {
      state.activeTask.taskState = taskState;
      return deepClone(state);
    }
  })
);