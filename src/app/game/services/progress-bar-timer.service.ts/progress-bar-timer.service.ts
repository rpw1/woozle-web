import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { concat, map, switchMap, timer } from 'rxjs';
import { ProgressBarQueueActions } from '../../../queue/state/progress-bar-queue.actions';
import { ProgressBarQueueEffects } from '../../../queue/state/progress-bar-queue.effects';
import { ProgressBarQueue } from '../../../queue/state/progress-bar-queue.model';
import { Constants } from '../../models/constants';
import { GameConstants } from '../../models/game-constants';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarTimerService {

  private progressBarQueueEffects = inject(ProgressBarQueueEffects);
  private store = inject(Store<ProgressBarQueue>);

  private timeElapsed = 0;
  private timer$ = timer(0, 10).pipe(
    map(_ => this.timeElapsed++),
    map(interval => interval / (GameConstants.SECONDS_ARRAY[0] * 10) )
  );

  constructor() {
    this.timer$.subscribe(width => {
      if (width > Constants.PERCENTAGE_CONVERSION) {
        this.store.dispatch(ProgressBarQueueActions.completeTask())
      }
    })
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
          return this.timer$;
        }
      }
    }))
}
