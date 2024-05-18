import { createReducer, on } from '@ngrx/store';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { TaskStateType } from '../models/queue-state-type.model';

export const initialState: ProgressBarQueue = {
  queuedTasks: 0,
  activeItemState: undefined,
  activeIndex: undefined
}

export const QueueStateReducer = createReducer<ProgressBarQueue>(
  initialState,
  on(ProgressBarQueueActions.completeTask, (state) => {
    console.log('Action Completed')
    return { ...state, activeItemState: TaskStateType.COMPLETED}
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
      queuedTasks: state.queuedTasks - 1,
      activeItemState: TaskStateType.STARTED,
      activeIndex: (state.activeIndex ?? 0) + 1
    }
  }),
  on(ProgressBarQueueActions.wait, (state) => {
    console.log('Task Waited')
    return state;
  })
);