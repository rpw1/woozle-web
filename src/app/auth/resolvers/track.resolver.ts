import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Track } from '../../game/state/models/track';
import { SpotifyService } from '../../shared/services/spotify.service';

// This is taylor swift: 37i9dQZF1DX5KpP2LN299J
// Rolling stones top 100: 6uRb2P6XRj5ygnanxpMCfS
// Woozle: 5WDtkOZjocf5Qs2WUxEdsg
// Classic Rock: 37i9dQZF1EIcVkEtbzdTRx
// 2000s Rock Bangers: 7GLUzbIwVGzQncTELBnmE6
// Keys jam: 5JhplKcqXZiA5C1oAjxf0f

export const trackResolver: ResolveFn<Track[]> = async (route, state) => {
  const spotifyService = inject(SpotifyService);
  const spotifyTracks = await firstValueFrom(spotifyService.getPlaylistTracks('5JhplKcqXZiA5C1oAjxf0f'));
  console.log(spotifyTracks);
  const tracks = spotifyTracks.items.map((item: any) => {
    return {
      song: item.track.name,
      album: item.track.album.name,
      artist: item.track.artists.map((x: any) => x.name).join(", "),
      songUri: item.track.uri
    } as Track;
  });
  return tracks;
};
