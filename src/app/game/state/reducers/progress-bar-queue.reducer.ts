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
  on(ProgressBarQueueActions.completeTask, (state) => {
    console.log('Action Completed')
    return {
      ...state,
      activeItemState: TaskStateType.COMPLETED,
      successiveTasksRan: state.successiveTasksRan + 1
    }
  }),

  on(ProgressBarQueueActions.queueTask, (state, { tasks }) => {
    console.log('Task Queued')
    if (tasks <= 0) {
      return state;
    }

    return { ...state, queuedTasks: state.queuedTasks + tasks,}
  }),

  on(ProgressBarQueueActions.resetTasks, () => {
    const resetState = {...initialState, activeItemState: TaskStateType.RESET}
    console.log('Reset Tasks')
    return resetState;
  }),

  on(ProgressBarQueueActions.startTask, (state) => {
    console.log('Task Started')
    return {
      ...state,
      queuedTasks: state.queuedTasks - 1,
      activeItemState: TaskStateType.RUNNING,
    }
  }),
  on(ProgressBarQueueActions.noOperation, (state) => {
    console.log('No Operation Needed')
    return state;
  })
);
