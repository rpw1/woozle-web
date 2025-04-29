import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { ContentService } from '../services/content.service';
import { ContentType } from './models/content-type';
import { Content } from './models/content';
import { Track } from './models/track';

export type TrackState = {
  tracks: Track[];
  contentId: string;
  contentType: ContentType;
  contentName: string;
  isLoading: boolean;
};

const initialState: TrackState = {
  tracks: [],
  contentId: '',
  contentType: ContentType.Playlist,
  contentName: '',
  isLoading: false,
};

export const TracksStore = signalStore(
  withState(initialState),
  withComputed(({ tracks, contentName, contentId }) => ({
    randomTracks: computed(() => {
      for (let i = tracks().length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = tracks()[i];
        tracks()[i] = tracks()[randomIndex];
        tracks()[randomIndex] = temp;
      }
      return tracks();
    }),
    contentName: computed(() => contentName?.()),
    contentId: computed(() => contentId?.()),
  })),
  withMethods((store, contentService = inject(ContentService)) => ({
    async loadTracks(content: Content): Promise<void> {
      patchState(store, { isLoading: true });
      const tracks = await firstValueFrom(
        contentService.getTracks(content.id, content.contentType)
      );
      patchState(store, {
        tracks,
        isLoading: false,
        contentId: content.id,
        contentType: content.contentType,
        contentName: content.name,
      });
    },
  }))
);
