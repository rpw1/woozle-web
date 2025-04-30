import { Injectable, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, concatMap, filter, map, of, takeUntil, tap, timer } from 'rxjs';
import { Constants } from '../models/constants';
import { GameConstants } from '../models/game-constants';
import { TaskStateType } from '../state/models/queue-state-type.model';
import { ProgressBarQueueStore } from '../state/progress-bar-queue.state';
import { GameStore } from '../state/game.state';

@Injectable()
export class ProgressBarTimerService {
  private readonly progressBarQueueStore = inject(ProgressBarQueueStore);
  private readonly gameStore = inject(GameStore);

  private timeElapsed = 0;

  private readonly timer$ = timer(0, 50).pipe(
    map(() => {
      this.timeElapsed += 1;
      const decimalPercent =
        (this.timeElapsed * 50) /
        (GameConstants.SECONDS_ARRAY[
          this.progressBarQueueStore.successiveTasksRan()
        ] *
          1000);
      return decimalPercent * Constants.PERCENTAGE_CONVERSION;
    }),
    tap((percent) => {
      if (percent > Constants.PERCENTAGE_CONVERSION) {
        this.progressBarQueueStore.completeTask();
        if (this.progressBarQueueStore.queuedTasks() === 0) {
          console.log('the queue service be doing it')
          this.gameStore.togglePlayerOff();
        }
      }
    }),
    takeUntil(
      toObservable(this.progressBarQueueStore.activeItemState).pipe(
        filter((state) => state === TaskStateType.COMPLETED || state === TaskStateType.RESET)
      )
    )
  );

  readonly progressBarSegmentPercentage$ = toObservable(
    this.progressBarQueueStore.activeItemState
  ).pipe(
    concatMap((task) => {
      console.log(task);
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
          this.timeElapsed = 0;
          return of(0);
        }
      }
    })
  );
}
