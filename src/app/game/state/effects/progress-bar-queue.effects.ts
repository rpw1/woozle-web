import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { TaskStateType } from '../models/queue-state-type.model';
import { selectQueuedTasks, selectQueueState } from '../selectors/progress-bar-queue.selector';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class ProgressBarQueueEffects {

  private action$ = inject(Actions);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  queueTask$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.queueTask),
      concatLatestFrom(() => this.progressBarQueueStore.select(selectQueueState)),
      concatMap(async ([_, queueState]) => {
        if (queueState.queuedTasks === 0
            || queueState.activeItemState === TaskStateType.RUNNING) {
          return ProgressBarQueueActions.noOperation();
        }

        return ProgressBarQueueActions.startTask();
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
      concatLatestFrom(() => this.progressBarQueueStore.select(selectQueuedTasks)),
      concatMap(async ([_, queuedTasks]) => {
        if(queuedTasks > 0) {
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

  taskStarted$ = createEffect(() => this.action$
  .pipe(
    ofType(ProgressBarQueueActions.startTask),
    exhaustMap(async () => {
      return ProgressBarQueueActions.runningTask();
    })
  ))
}
