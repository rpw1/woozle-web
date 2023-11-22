export interface WoozleTask {
  id: string,
  taskType: WoozleTaskType,
  taskState: WoozleTaskState,
  index?: number
}

export enum WoozleTaskType {
  RUN_PROGRESS_SEGMENT_QUEUE
}

export enum WoozleTaskState {
  QUEUED,
  STARTED,
  ENDED,
  CLEARED
}