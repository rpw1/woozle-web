import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';
import { WoozleTaskType } from '../../../models/woozle-task/woozle-task-type';
import { WoozleTaskState } from '../../../models/woozle-task/woozle-task-state';
import { WoozleTask } from '../../../models/woozle-task/woozle-task';

@Injectable({
  providedIn: 'root'
})
export class TaskSchedulerService {
  private queuedTasks: WoozleTask[] = []
  private isTaskCurrentlyRunning: boolean = false;
  private taskSchedulerSubject = new Subject<WoozleTask>();
  taskScheduler$ = this.taskSchedulerSubject.asObservable();

  constructor() { }

  queueTask(taskType: WoozleTaskType, index?: number): void {
    const id = uuid.v4();
    const task = {
      id: id,
      taskState: WoozleTaskState.QUEUED,
      taskType: taskType,
      index: index
    } as WoozleTask;
    this.queuedTasks.push(task);
    this.taskSchedulerSubject.next(task);
    if (!this.isTaskCurrentlyRunning) {
      this.startTask();
    }
  }

  private startTask(): void {
    this.isTaskCurrentlyRunning = true;
    const currentTask = this.queuedTasks.shift();
    if (currentTask !== undefined) {
      currentTask.taskState = WoozleTaskState.STARTED
      this.taskSchedulerSubject.next(currentTask);
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
    this.queuedTasks = [] as WoozleTask[];

    const id = uuid.v4();
    const task = {
      id: id,
      taskState: WoozleTaskState.CLEARED,
      taskType: taskType,
    } as WoozleTask;
    this.taskSchedulerSubject.next(task);
  }
}
