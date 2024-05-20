import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { TaskStateType } from '../models/queue-state-type.model';
import { selectQueuedTasks, selectQueueState } from '../selectors/progress-bar-queue.selector';

@Injectable()
export class ProgressBarQueueEffects {

  private action$ = inject(Actions);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  queueTask$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.queueTask),
      concatMap(async () => {
        const state = this.progressBarQueueStore.selectSignal(selectQueueState);

        if (state().activeItemState === TaskStateType.COMPLETED && state().queuedTasks > 0) {
          return ProgressBarQueueActions.startTask();
        }

        if (state().activeItemState !== TaskStateType.RUNNING) {
          return ProgressBarQueueActions.startTask();
        }

        return ProgressBarQueueActions.noOperation();
      })
    )
  );

  queueGuessTasks$ = createEffect(() => this.action$
    .pipe(
      ofType(GameActions.togglePlayerOn),
      exhaustMap(async (tasks) => {
        return ProgressBarQueueActions.queueTask(tasks)
      })
    )
  );

  resetTasksForPlayer = createEffect(() => this.action$
    .pipe(
      ofType(GameActions.togglePlayerOff),
      exhaustMap(async () => {
        return ProgressBarQueueActions.resetTasks()
      })
    )
  );

  completeTask$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.completeTask),
      concatMap(async () => {
        const queuedTasks = this.progressBarQueueStore.selectSignal(selectQueuedTasks);

        if(queuedTasks() > 0) {
          return ProgressBarQueueActions.startTask();
        }

        return ProgressBarQueueActions.completeAllTasks();
      })
    )
  );

  completeAllTasks$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.completeAllTasks),
      concatMap(async () => {
        return ProgressBarQueueActions.resetTasks();
      })
    )
  );
}
