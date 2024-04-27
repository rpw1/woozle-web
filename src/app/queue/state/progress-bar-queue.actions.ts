import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ProgressBarQueueActions = createActionGroup({
  source: 'Queue State',
  events: {
    'Queue': props<{ tasks: number }>(),
    'Reset': emptyProps(),
    'Start': emptyProps(),
  }
})