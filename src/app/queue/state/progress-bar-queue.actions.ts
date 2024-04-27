import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ProgressBarQueueActions = createActionGroup({
  source: 'Progress Bar Queue',
  events: {
    'Complete Task': emptyProps(),
    'Queue Task': props<{ tasks: number }>(),
    'Reset Tasks': emptyProps(),
    'Start Task': emptyProps(),
    'Wait': emptyProps() // Acts as a do nothing action for task needs to wait in queue
  }
})