import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, concat, map, of, switchMap, timer } from 'rxjs';
import { ProgressBarQueueActions } from '../../state/actions/progress-bar-queue.actions';
import { ProgressBarQueueEffects } from '../../state/effects/progress-bar-queue.effects';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { Constants } from '../../models/constants';
import { GameConstants } from '../../models/game-constants';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarTimerService {

  private progressBarQueueEffects = inject(ProgressBarQueueEffects);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  private timeElapsed = 0;
  private timer$ = of(1) // timer(0, 10).pipe(
    // map(_ => this.timeElapsed++),
    // map(interval => interval / (GameConstants.SECONDS_ARRAY[0] * 10) )
  // );

  constructor() {
    // this.progressBarPercentage$.subscribe(width => {
    //   if (width > Constants.PERCENTAGE_CONVERSION) {
    //     this.progressBarQueueStore.dispatch(ProgressBarQueueActions.completeTask())
    //   }
    // })
  }

  progressBarPercentage$ = concat(
    this.progressBarQueueEffects.taskStarted$,
    this.progressBarQueueEffects.taskCompleted$,
    this.progressBarQueueEffects.resetTasks$
  ).pipe(
    switchMap(action => {
      switch (action.type) {
        case ProgressBarQueueActions.startTask.type: {
          return this.timer$;
        }
        case ProgressBarQueueActions.completeTask.type:
        case ProgressBarQueueActions.resetTasks.type: {
          this.timeElapsed = 0;
          return EMPTY;
        }
      }
    }))
}
