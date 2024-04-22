import { Injectable, inject } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import * as uuid from 'uuid';
import { WoozleTaskType } from '../models/woozle-task-type';
import { WoozleTaskState } from '../models/woozle-task-state';
import { WoozleTask } from '../models/woozle-task';
import { Store } from '@ngrx/store';
import { QueueState } from '../state/queue-state.model';
import { addQueueState, shiftQueueState, updateActiveTask } from '../state/queue-state.actions';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private isTaskCurrentlyRunning: boolean = false;
  private taskSchedulerSubject = new Subject<WoozleTask>();
  taskScheduler$ = this.taskSchedulerSubject.asObservable();

  constructor(private store: Store<QueueState>) {
    this.store.select('activeTask').pipe(
      filter(x => x !== undefined)
    ).subscribe(task => {
      store.dispatch(updateActiveTask({taskState: WoozleTaskState.STARTED}))
    });
  }
  

  queueTask(taskType: WoozleTaskType, index?: number): void {
    const id = uuid.v4();
    const task: WoozleTask = {
      id: id,
      taskState: WoozleTaskState.QUEUED,
      taskType: taskType,
      index: index
    };
    this.store.dispatch(addQueueState({task: task}));
    
    this.taskSchedulerSubject.next(task);
    if (!this.isTaskCurrentlyRunning) {
      this.store.dispatch(shiftQueueState());
    }
  }


  endTask(task: WoozleTask): void {
    if (this.queuedTasks.length > 0) {
      task.taskState = WoozleTaskState.ENDED;
      this.taskSchedulerSubject.next(task);
      this.startTask();
    } else {
      this.isTaskCurrentlyRunning = false;
      task.taskState = WoozleTaskState.ENDED;
      this.taskSchedulerSubject.next(task);
    }
  }

  hasRunningTask(): boolean {
    return this.isTaskCurrentlyRunning;
  }

  clearAllTasks(taskType: WoozleTaskType) {
    this.isTaskCurrentlyRunning = false;
    this.queuedTasks = [];

    const id = uuid.v4();
    const task: WoozleTask = {
      id: id,
      taskState: WoozleTaskState.CLEARED,
      taskType: taskType,
    };

    this.taskSchedulerSubject.next(task);
  }
}
