import { WoozleTaskState } from "./woozle-task-state";
import { WoozleTaskType } from "./woozle-task-type";

export interface WoozleTask {
  id: string,
  taskType: WoozleTaskType,
  taskState: WoozleTaskState,
  index?: number
}