import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Track } from '../../../content/state/models/track';
import { SpotifyDevice } from '../../../shared/models/spotify-device';
import { Guess } from '../../models/guess';
import { GameState } from '../models/game-state.model';

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    addGuess: props<{ guess: Guess }>(),
    reset: emptyProps(),
    updateGameState: props<{ newGameState: GameState }>(),

    togglePlayerOn: emptyProps(),
    togglePlayerOnSuccess: emptyProps(),
    togglePlayerOff: emptyProps(),
    togglePlayerOffSuccess: emptyProps(),

    setGameSolution: emptyProps(),
    setGameSolutions: props<{ solutions: Track[] }>(),

    loadDevice: props<{ device: SpotifyDevice }>(),
    loadDeviceSuccess: emptyProps(),
  },
});
