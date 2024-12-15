import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { Game } from '../models/game.model';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { TaskStateType } from '../models/queue-state-type.model';
import { selectNumberOfGuesses } from '../selectors/game.selector';
import { selectQueuedTasks, selectQueueState } from '../selectors/progress-bar-queue.selector';

@Injectable()
export class ProgressBarQueueEffects {

  private readonly action$ = inject(Actions);
  private readonly progressBarQueueStore = inject(Store<ProgressBarQueue>);
  private readonly gameStore = inject(Store<Game>);

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
      ofType(GameActions.togglePlayerOnSuccess),
      concatLatestFrom(() => this.gameStore.select(selectNumberOfGuesses)),
      exhaustMap(async ([action, numberOfGuesses]) => ProgressBarQueueActions.queueTask({ tasks: numberOfGuesses + 1 }))
    )
  );

  readonly resetTasksForPlayer = createEffect(() =>
    this.action$.pipe(
      ofType(
        GameActions.togglePlayerOff,
        GameActions.reset,
        ProgressBarQueueActions.completeAllTasks
      ),
      exhaustMap(async () => ProgressBarQueueActions.resetTasks())
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
}
