import { createAction, props } from "@ngrx/store";
import { WoozleTask } from "../models/woozle-task";

export enum QueueStateActionType {
  ADD_QUEUE_STATE = '[Queue State] Add',
  RESET_QUEUE_STATE = '[Queue State] Reset',
  SHIFT_QUEUE_TASK = '[Queue State] Shift'
}

export const addQueueState = createAction(QueueStateActionType.ADD_QUEUE_STATE, props<{ task: WoozleTask }>());
export const resetQueueState = createAction(QueueStateActionType.RESET_QUEUE_STATE);
export const shiftQueueState = createAction(QueueStateActionType.SHIFT_QUEUE_TASK);