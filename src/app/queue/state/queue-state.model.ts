import { WoozleTask } from "../models/woozle-task";

export interface QueueState {
  queue: WoozleTask[]
  activeTask: WoozleTask | undefined
}