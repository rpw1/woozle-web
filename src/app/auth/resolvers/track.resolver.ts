import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Track } from '../../game/state/models/track';
import { SpotifyService } from '../../shared/services/spotify.service';
import { Store } from '@ngrx/store';
import { Game } from '../../game/state/models/game.model';
import { selectPlaylist } from '../../game/state/selectors/game.selector';
import { GameActions } from '../../game/state/actions/game.actions';

export const trackResolver: ResolveFn<boolean> = async (route, state) => {
  const gameStore = inject(Store<Game>);
  const spotifyService = inject(SpotifyService);
  const playlistId = (await firstValueFrom(gameStore.select(selectPlaylist))).playlistId;
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
      songUri: item.track.uri,
      imageUri: item.track.album.images[0].url
    } as Track;
  });
  gameStore.dispatch(GameActions.setPlaylistTracks({tracks}));
  gameStore.dispatch(GameActions.setGameSolution());
  return true;
};
