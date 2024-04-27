import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProgressBarQueueActions } from './progress-bar-queue.actions';
import { concatMap, lastValueFrom, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProgressBarQueue } from './progress-bar-queue.model';
import { selectActiveTask } from './progress-bar-queue.selector';

@Injectable()
export class ProgressBarQueueEffects {

  private action$ = inject(Actions);
  private store = inject(Store<ProgressBarQueue>);

  queueTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProgressBarQueueActions.queueTask),
      concatMap(async () => {
        const isTaskRunning = await lastValueFrom(this.store.select(selectActiveTask));
    
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