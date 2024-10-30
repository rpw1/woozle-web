import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Track } from '../../game/state/models/track';
import { SpotifyService } from '../../shared/services/spotify.service';
import { Store } from '@ngrx/store';
import { Game } from '../../game/state/models/game.model';
import { selectPlaylistId } from '../../game/state/selectors/game.selector';

export const trackResolver: ResolveFn<Track[]> = async (route, state) => {
  console.log('in track resolver')
  const game = inject(Store<Game>);
  const spotifyService = inject(SpotifyService);
  const playlistId = await firstValueFrom(game.select(selectPlaylistId));
  console.log(playlistId)
  let offset = 0;
  let isFullTrackList = false;
  let spotifyTracks: any[] = []
  while (!isFullTrackList) {
    const spotifyTracksResponse = await firstValueFrom(spotifyService.getPlaylistTracks(playlistId, offset));
    spotifyTracks = spotifyTracks.concat(spotifyTracksResponse.items);
    offset += 100;
    isFullTrackList = !spotifyTracksResponse.next
  }

  const tracks = spotifyTracks.map((item: any) => {
    return {
      song: item.track.name,
      album: item.track.album.name,
      artist: item.track.artists.map((x: any) => x.name).join(", "),
      songUri: item.track.uri
    } as Track;
  });
  return tracks;
};
