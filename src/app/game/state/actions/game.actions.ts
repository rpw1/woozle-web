import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Guess } from '../../models/guess';
import { GameState } from '../models/game-state.model';

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    'Add Guess': props<{ guess: Guess }>(),
    'Reset': emptyProps(),
    'Toggle Player': emptyProps(),
    'Toggle Player On': props<{ tasks: number }>(),
    'Toggle Player Off': emptyProps(),
    'Update Game State': props<{ newGameState : GameState }>()
  }
})
