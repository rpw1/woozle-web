import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SpotifyDevice } from '../../../shared/models/spotify-device';
import { Guess } from '../../models/guess';
import { Content } from '../models/content';
import { GameState } from '../models/game-state.model';
import { Track } from '../models/track';
import { ContentSearchParameters } from '../models/content-search-parameters';

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    addGuess: props<{ guess: Guess }>(),
    reset: emptyProps(),
    updateGameState: props<{ newGameState : GameState }>(),

    togglePlayerOn: emptyProps(),
    togglePlayerOnSuccess: emptyProps(),
    togglePlayerOff: emptyProps(),
    togglePlayerOffSuccess: emptyProps(),

    searchContent: props<{ searchParameters: ContentSearchParameters | undefined }>(),
    searchContentSuccess: props<{ contents: Content[] }>(),
    loadContent: props<{ content: Content }>(),
    loadContentSuccess: props<{ tracks: Track[] }>(),
    setGameSolution: emptyProps(),

    loadDevice: props<{ device: SpotifyDevice }>(),
    loadDeviceSuccess: emptyProps()
  }
})
