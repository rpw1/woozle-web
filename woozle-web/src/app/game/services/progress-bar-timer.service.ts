import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, concatMap, filter, map, of, takeUntil, tap, timer, withLatestFrom } from 'rxjs';
import { Constants } from '../models/constants';
import { GameConstants } from '../models/game-constants';
import { ProgressBarQueueActions } from '../state/actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../state/models/progress-bar-queue.model';
import { TaskStateType } from '../state/models/queue-state-type.model';
import { selectActiveItemState, selectSuccessiveTasksRan } from '../state/selectors/progress-bar-queue.selector';

@Injectable()
export class ProgressBarTimerService {

  private readonly progressBarQueueStore = inject(Store<ProgressBarQueue>);

  private timeElapsed = 0;
  
  private readonly timer$ = timer(0, 50).pipe(
    withLatestFrom(this.progressBarQueueStore.select(selectSuccessiveTasksRan)),
    map(([_, successiveTasksRan]) => {
      this.timeElapsed += 1
      const decimalPercent = (this.timeElapsed * 50) / (GameConstants.SECONDS_ARRAY[successiveTasksRan] * 1000);
      return decimalPercent * Constants.PERCENTAGE_CONVERSION;
    }),
    tap((percent) => {
      if ((percent) > Constants.PERCENTAGE_CONVERSION) {
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.completeTask())
      }
    }),
    takeUntil(this.progressBarQueueStore
      .select(selectActiveItemState).pipe(filter(state => state === TaskStateType.COMPLETED)))
  )

  readonly progressBarSegmentPercentage$ = this.progressBarQueueStore
    .select(selectActiveItemState)
    .pipe(
      concatMap(task => {
        switch (task) {
          case undefined: {
            return EMPTY;
          }
          case TaskStateType.RUNNING: {
            return this.timer$;
          }
          case TaskStateType.COMPLETED: {
            this.timeElapsed = 0;
            return EMPTY;
          }
          case TaskStateType.RESET: {
            return of(0);
          }
        }
    }))
}
