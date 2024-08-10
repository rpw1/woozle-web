import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Guess } from '../../models/guess';

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    'Add Guess': props<{ guess: Guess}>(),
    'Reset': emptyProps(),
    'Toggle Player': emptyProps()
  }
})