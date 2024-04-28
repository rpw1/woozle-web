import { createActionGroup, emptyProps } from "@ngrx/store";

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    'Add Guess': emptyProps(),
    'Reset': emptyProps(),
    'Toggle Player': emptyProps()
  }
})