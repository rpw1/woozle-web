import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, concatMap, filter, map, of, takeUntil, timer } from 'rxjs';
import { Constants } from '../../models/constants';
import { GameConstants } from '../../models/game-constants';
import { ProgressBarQueueActions } from '../../state/actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { TaskStateType } from '../../state/models/queue-state-type.model';
import { selectSuccessiveTasksRan, selectActiveItemState } from '../../state/selectors/progress-bar-queue.selector';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarTimerService {

  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  private timeElapsed = 0;
  private timer$ = timer(0, 1).pipe(
    map(_ => {
      this.timeElapsed = this.timeElapsed + 1;
      return this.timeElapsed;
    }),
    concatLatestFrom(() => this.progressBarQueueStore.select(selectSuccessiveTasksRan)),
    map(([interval, successiveTasksRan]) => {
      return interval / (GameConstants.SECONDS_ARRAY[successiveTasksRan] * 10)
    }),
    map(percent => {
      if (percent > Constants.PERCENTAGE_CONVERSION) {
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.completeTask())
      }
      return percent
    }),
    takeUntil(this.progressBarQueueStore
      .select(selectActiveItemState).pipe(filter(state => state === TaskStateType.COMPLETED)))
  );

  progressBarSegmentPercentage$ = this.progressBarQueueStore
    .select(selectActiveItemState)
    .pipe(
      concatMap(task => {
        if (task === undefined) {
          return EMPTY;
        }
        switch (task) {
          case TaskStateType.STARTED: {
            this.timeElapsed = 0;
            return this.timer$;
          }
          case TaskStateType.RUNNING: {
            return this.timer$;
          }
          case TaskStateType.COMPLETED: {
            return EMPTY;
          }
          case TaskStateType.RESET: {
            return of(0);
          }
        }
    }))
}
