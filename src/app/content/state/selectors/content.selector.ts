import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Content } from '../models/content';

export const selectGameState = createFeatureSelector<Content>('content');

export const selectAvailableAlbums = createSelector(
  selectGameState,
  (state: Content) => {
    if (state.availableContentFilters.name !== undefined) {
      return state.availableContent.albums
        .filter(x => x.name.toLocaleLowerCase().includes(state.availableContentFilters.name!));
    }

    return state.availableContent.albums;
  }
);

export const selectAvailableArtists = createSelector(
  selectGameState,
  (state: Content) => {
    if (state.availableContentFilters.name !== undefined) {
      return state.availableContent.artists
        .filter(x => x.name.toLocaleLowerCase().includes(state.availableContentFilters.name!));
    }

    return state.availableContent.artists;
  }
);

export const selectAvailablePlaylists = createSelector(
  selectGameState,
  (state: Content) => {
    if (state.availableContentFilters.name !== undefined) {
      return state.availableContent.playlists
        .filter(x => x.name.toLocaleLowerCase().includes(state.availableContentFilters.name!));
    }

    return state.availableContent.playlists;
  }
);
