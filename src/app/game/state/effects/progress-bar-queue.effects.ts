import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap } from 'rxjs';
import { GameActions } from '../actions/game.actions';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { TaskStateType } from '../models/queue-state-type.model';
import { selectQueueState } from '../selectors/progress-bar-queue.selector';

export class ProgressBarQueueEffects {

  private action$ = inject(Actions);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  queueTask$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.queueTask),
      concatLatestFrom(() => this.progressBarQueueStore.select(selectQueueState)),
      concatMap(async ([_, queueState]) => {
        console.log('Queue Task Effect')

        if (queueState.activeItemState === TaskStateType.COMPLETED 
          && queueState.queuedTasks > 0) {
          return ProgressBarQueueActions.startTask();
        }
        
        if (queueState.activeItemState !== TaskStateType.STARTED) {
          return ProgressBarQueueActions.startTask();
        }

        return ProgressBarQueueActions.wait();
      })
    )
  );

  completeTask$ = createEffect(() => this.action$
    .pipe(
      ofType(ProgressBarQueueActions.completeTask),
      concatLatestFrom(() => this.progressBarQueueStore.select(selectQueueState)),
      concatMap(async ([_, queueState]) => {
        console.log('Complete Task Effect')

        if(queueState.queuedTasks > 0) {
          return ProgressBarQueueActions.startTask();
        }

        return GameActions.togglePlayer();
      })
    )
  );
}