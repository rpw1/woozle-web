import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProgressBarQueueActions } from '../actions/progress-bar-queue.actions';
import { concatMap, lastValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProgressBarQueue } from '../models/progress-bar-queue.model';
import { selectActiveTask } from '../selectors/progress-bar-queue.selector';

@Injectable()
export class ProgressBarQueueEffects {

  private action$ = inject(Actions);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);

  queueTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProgressBarQueueActions.queueTask),
      concatMap(async () => {
        const isTaskRunning = await lastValueFrom(this.progressBarQueueStore.select(selectActiveTask));
    
        if (isTaskRunning) {
          return ProgressBarQueueActions.wait();
        }

        return ProgressBarQueueActions.startTask();
      })
    )
  });

  resetTasks$ = createEffect(() => this.action$.pipe(ofType(ProgressBarQueueActions.resetTasks)));
  taskCompleted$ = createEffect(() => this.action$.pipe(ofType(ProgressBarQueueActions.completeTask)));
  taskStarted$ = createEffect(() => this.action$.pipe(ofType(ProgressBarQueueActions.startTask)));
}