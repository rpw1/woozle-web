import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, lastValueFrom, take } from 'rxjs';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { TaskStateType } from '../models/queue-state-type.model';
import { selectActiveItemState } from '../selectors/progress-bar-queue.selector';

@Injectable()
export class ProgressBarQueueEffects {

  private action$ = inject(Actions);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  queueTask$ = createEffect(() => this.action$.pipe(
      ofType(ProgressBarQueueActions.queueTask),
      concatMap(async () => {
        console.log('Queue Task Effect')
        const state = await lastValueFrom(this.progressBarQueueStore.select(selectActiveItemState).pipe(take(1)));
        
        console.log('Effect State', state)
        if (state !== TaskStateType.STARTED) {
          return ProgressBarQueueActions.startTask();
        }

        return ProgressBarQueueActions.wait();
      })
    )
  );
}