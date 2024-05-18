import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, concatMap, filter, lastValueFrom, map, of, take, takeUntil, timer } from 'rxjs';
import { Constants } from '../../models/constants';
import { GameConstants } from '../../models/game-constants';
import { ProgressBarQueueActions } from '../../state/actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { TaskStateType } from '../../state/models/queue-state-type.model';
import { selectActiveIndex, selectActiveItemState } from '../../state/selectors/progress-bar-queue.selector';

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
    map(async (interval) => {
      const activeIndex = await lastValueFrom(this.progressBarQueueStore.select(selectActiveIndex).pipe(take(1))) ?? 0;
      return interval / (GameConstants.SECONDS_ARRAY[activeIndex - 1] * 10)
    }),
    map(async percent => {
      if (await percent > Constants.PERCENTAGE_CONVERSION) {
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.completeTask())
      }
      return percent
    }),
    takeUntil(this.progressBarQueueStore
      .select(selectActiveItemState).pipe(filter(state => state === TaskStateType.COMPLETED)))
  );

  progressBarPercentage$ = this.progressBarQueueStore
    .select(selectActiveItemState)
    .pipe(
      concatMap(task => {
        console.log('Task', task)
        if (task === undefined) {
          return EMPTY;
        }
        switch (task) {
          case TaskStateType.STARTED: {
            return this.timer$;
          }
          case TaskStateType.COMPLETED:
          case TaskStateType.RESET: {
            this.timeElapsed = 0;
            return EMPTY;
          }
        }
    }))
}
