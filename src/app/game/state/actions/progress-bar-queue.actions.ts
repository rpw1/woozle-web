import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ProgressBarQueueActions = createActionGroup({
  source: 'Progress Bar Queue',
  events: {
    'Complete Task': emptyProps(),
    'Complete All Tasks': emptyProps(),
    'Queue Task': props<{ tasks: number }>(),
    'Reset Tasks': emptyProps(),
    'Start Task': emptyProps(),
    'No Operation': emptyProps()
  }
})
