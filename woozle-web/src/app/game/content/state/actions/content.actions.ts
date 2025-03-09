import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AvailableContent } from '../models/available-content';
import { SpotifyContent } from '../models/spotify-content';
import { Track } from '../models/track';
import { AvailableContentFilters } from '../models/available-content-filters';

export const ContentActions = createActionGroup({
  source: 'Content State',
  events: {
    loadContent: emptyProps(),
    loadContentSuccess: props<{ availableContent: AvailableContent }>(),
    searchAvailableContent: props<{ filters: AvailableContentFilters }>(),
    setGameContent: props<{ content: SpotifyContent }>(),
    setGameContentSuccess: props<{ tracks: Track[] }>(),
    createGameSolutions: props<{ solutions: number[] }>(),
    resetAvailableContentFilters: emptyProps(),
  }
})
