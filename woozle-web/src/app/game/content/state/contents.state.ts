import { computed, inject, Signal } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { ContentService } from '../services/content.service';
import { GoodContent } from './models/good-content';
import { ContentType } from './models/content-type';

export enum GoodContentFilterType {
  Ascending,
  Descending,
  Recent,
}

export type GoodContentFilters = {
  filterType: GoodContentFilterType;
  name?: string;
};

export type GoodContentState = {
  contents: GoodContent[];
  isLoading: boolean;
  filters: GoodContentFilters;
};

const initialState: GoodContentState = {
  contents: [],
  isLoading: false,
  filters: {
    filterType: GoodContentFilterType.Recent,
  },
};

export const ContentsStore = signalStore(
  withState(initialState),
  withComputed(({ contents, filters }) => ({
    albums: computed(() =>
      getAvailableContent(ContentType.Album, contents, filters)
    ),
    artists: computed(() =>
      getAvailableContent(ContentType.Artist, contents, filters)
    ),
    playlists: computed(() =>
      getAvailableContent(ContentType.Playlist, contents, filters)
    ),
  })),
  withMethods((store, contentService = inject(ContentService)) => ({
    async loadContent(): Promise<void> {
      patchState(store, { isLoading: true });
      const contents = await firstValueFrom(contentService.getContent());
      patchState(store, { contents, isLoading: false });
    },
    resetFilters(): void {
      patchState(store, () => ({ filters: { ...initialState.filters } }));
    },
    updateFilters(filters: GoodContentFilters): void {
      patchState(store, () => ({ filters: filters }));
    },
  }))
);

const getAvailableContent = (
  contentType: ContentType,
  contents: Signal<GoodContent[]>,
  filters: Signal<GoodContentFilters>
) => {
  const availableContents = contents().filter(
    (content) =>
      content.name
        .toLowerCase()
        .trim()
        .includes(filters().name?.toLowerCase().trim() ?? '') &&
      content.contentType == contentType
  );

  switch (filters().filterType) {
    case GoodContentFilterType.Ascending:
      return availableContents.sort((a, b) => a.name.localeCompare(b.name));
    case GoodContentFilterType.Descending:
      return availableContents.sort(
        (a, b) => a.name.localeCompare(b.name) * -1
      );
    default:
      return availableContents;
  }
};
