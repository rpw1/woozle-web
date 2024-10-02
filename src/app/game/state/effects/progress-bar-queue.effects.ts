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

  private readonly action$ = inject(Actions);
  private readonly progressBarQueueStore = inject(Store<ProgressBarQueue>);

  readonly queueTask$ = createEffect(() =>
    this.action$.pipe(
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

  readonly queueGuessTasks$ = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.togglePlayerOn),
      exhaustMap(async (tasks) => {
        return ProgressBarQueueActions.queueTask(tasks);
      })
    )
  );

  readonly resetTasksForPlayer = createEffect(() =>
    this.action$.pipe(
      ofType(
        GameActions.togglePlayerOff,
        GameActions.reset
      ),
      exhaustMap(async () => {
        return ProgressBarQueueActions.resetTasks();
      })
    )
  );

  readonly completeTask$ = createEffect(() =>
    this.action$.pipe(
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

  readonly completeAllTasks$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProgressBarQueueActions.completeAllTasks),
      exhaustMap(async () => {
        return ProgressBarQueueActions.resetTasks();
      })
    )
  );

  readonly taskStarted$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProgressBarQueueActions.startTask),
      exhaustMap(async () => {
        return ProgressBarQueueActions.runningTask();
      })
    )
  );
}
