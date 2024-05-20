import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Guess } from '../../models/guess';

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    'Add Guess': props<{ guess: Guess }>(),
    'Reset': emptyProps(),
    'Toggle Player': emptyProps(),
    'Toggle Player On': props<{ tasks: number }>(),
    'Toggle Player Off': emptyProps()
  }
})
