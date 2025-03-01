import { createReducer, on } from '@ngrx/store';
import { Content } from '../models/content';
import { ContentType } from '../models/content-type';
import { ContentActions } from '../actions/content.actions';

export const initialState: Content = {
  availableContent: {
    albums: [],
    artists: [],
    playlists: [],
  },
  availableContentFilters: {
    name: undefined,
  },
  gameContent: {
    id: '',
    type: ContentType.Album,
    name: '',
    description: undefined,
    image: {
      url: '',
      height: 0,
      width: 0,
    },
    tracks: [],
  },
};

export const ContentReducer = createReducer<Content>(
  initialState,
  on(ContentActions.loadContentSuccess, (state, action) => ({
    ...state,
    availableContent: action.availableContent,
  })),
  on(ContentActions.searchAvailableContent, (state, actions) => ({
    ...state,
    availableContentFilters: actions.filters,
  })),
  on(ContentActions.setGameContent, (state, actions) => ({
    ...state,
    gameContent: actions.content,
  })),
  on(ContentActions.setGameContentSuccess, (state, actions) => ({
    ...state,
    gameContent: { ...state.gameContent, tracks: actions.tracks },
  })),
  on(ContentActions.resetAvailableContentFilters, (state, actions) => ({
    ...state,
    availableContentFilters: { ...initialState.availableContentFilters },
  }))
);
