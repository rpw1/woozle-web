import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ProgressBarQueueActions = createActionGroup({
  source: 'Progress Bar Queue',
  events: {
    completeTask: emptyProps(),
    completeAllTasks: emptyProps(),
    queueTask: props<{ tasks: number }>(),
    resetTasks: emptyProps(),
    startTask: emptyProps(),
    noOperation: emptyProps()
  }
})
