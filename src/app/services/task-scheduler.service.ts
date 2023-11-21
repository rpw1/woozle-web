import { Injectable } from '@angular/core';
import { WoozleTask, WoozleTaskState, WoozleTaskType } from '../models/woozle-task';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';

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
  }

  startTask(): void {
    this.isTaskCurrentlyRunning = true;
    const currentTask = this.queuedTasks.shift();
    if (currentTask !== undefined) {
      currentTask.taskState = WoozleTaskState.STARTED
      this.taskSchedulerSubject.next(currentTask);
    }
  }

  endTask(task: WoozleTask): void {
    this.isTaskCurrentlyRunning = false;
    task.taskState = WoozleTaskState.ENDED;
    this.taskSchedulerSubject.next(task);
  }

  getQueuedTaskCount(): number {
    return this.queuedTasks.length;
  }

  hasRunningTask(): boolean {
    return this.isTaskCurrentlyRunning;
  }

  clearAllTasks() {
    this.isTaskCurrentlyRunning = false;
    this.queuedTasks = [] as WoozleTask[];
  }
}
