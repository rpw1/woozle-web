import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ProgressBarQueue } from './models/progress-bar-queue.model';
import { TaskStateType } from './models/queue-state-type.model';

const initialState: ProgressBarQueue = {
  queuedTasks: 0,
  activeItemState: undefined,
  successiveTasksRan: 0,
};

export const ProgressBarQueueStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    completeTask(): void {
      patchState(store, {
        activeItemState: TaskStateType.COMPLETED,
        successiveTasksRan: store.successiveTasksRan() + 1,
      });

      if (store.queuedTasks() > 0) {
        this.startTask();
      } else {
        this.resetTasks();
      }
    },
    queueTasks(tasks: number): void {
      patchState(store, { queuedTasks: store.queuedTasks() + tasks });
      if (
        store.queuedTasks() === 0 ||
        store.activeItemState() === TaskStateType.RUNNING
      ) {
        return;
      }
      this.startTask();
    },
    resetTasks(): void {
      patchState(store, {
        ...initialState,
        activeItemState: TaskStateType.RESET,
      });
    },
    startTask(): void {
      patchState(store, {
        queuedTasks: store.queuedTasks() - 1,
        activeItemState: TaskStateType.RUNNING,
      });
    },
  }))
);
