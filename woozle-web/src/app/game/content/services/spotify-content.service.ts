import { inject, Injectable } from '@angular/core';
import {
  combineLatest,
  EMPTY,
  expand,
  from,
  map,
  mergeMap,
  Observable,
  of,
  reduce
} from 'rxjs';
import { SpotifyPlaylist } from '../../../shared/models/spotify-playlist';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { AvailableContent } from '../state/models/available-content';
import { ContentType } from '../state/models/content-type';
import { SpotifyContent } from '../state/models/spotify-content';
import { Track } from '../state/models/track';

@Injectable({
  providedIn: 'root',
})
export class SpotifyContentService {
  private readonly spotifyService = inject(SpotifyService);

  loadContent(): Observable<AvailableContent> {
    return combineLatest([
      this.loadSavedAlbums(),
      this.loadFollowedArtists(),
      this.loadCurrentUserPlaylists(),
    ]).pipe(
      map(([albums, artists, playlists]): AvailableContent => {
        return {
          albums: albums,
          artists: artists,
          playlists: playlists,
        };
      })
    );
  }

  loadTracks(content : SpotifyContent): Observable<Track[]> {
    if (content.type === ContentType.Artist) {
      return this.loadArtistTracks(content.id);
    }

    if (content.type === ContentType.Playlist) {
      return this.loadPlaylistTracks(content.id)
    }

    return of(content.tracks);
  }

  private loadPlaylistTracks(playlistId: string): Observable<Track[]> {
    return this.spotifyService.getPlaylistTracks(playlistId).pipe(
      expand((response) =>
        response.next
          ? this.spotifyService.getPlaylistTracks(
              playlistId,
              response.offset + 100
            )
          : EMPTY
      ),
      map((response) =>
        response.items
          .filter((item: any) => item != null) 
          .map((item) => {
          return {
            song: item.track.name,
            album: item.track.album.name,
            artist: item.track.artists.map((x: any) => x.name).join(', '),
            songUri: item.track.uri,
            image: item.track.album.images.at(0),
          } as Track;
        })
      ),
      reduce((acc: Track[], tracks) => acc.concat(tracks), []),
      map(tracks => [...new Map(tracks.map(x => [`${x.song} - ${x.artist}`, x])).values()])
    );
  }

  private loadArtistTracks(artistId: string) {
    return this.spotifyService.getArtistAlbums(artistId).pipe(
      mergeMap((response) => from(response.items as any[])),
      mergeMap((album) =>
        this.spotifyService.getAlbumTracks(album.id).pipe(
          expand((response) =>
            response.next
              ? this.spotifyService.getAlbumTracks(
                  album.id,
                  response.offset + 100
                )
              : EMPTY
          ),
          map((response) =>
            response.items
              .filter((item: any) => item != null) 
              .map((item: any): Track => {
              return {
                song: item.name,
                album: album.name,
                artist: item.artists.map((x: any) => x.name).join(', '),
                songUri: item.uri,
                image: album.images.at(0),
              };
            })
          )
        )
      ),
      reduce((acc: Track[], tracks) => acc.concat(tracks), []),
      map(tracks => [...new Map(tracks.map(x => [`${x.song} - ${x.artist}`, x])).values()])
    );
  }

  private loadSavedAlbums(): Observable<SpotifyContent[]> {
    return this.spotifyService.getSavedAlbums().pipe(
      expand((response) =>
        response.next
          ? this.spotifyService.getSavedAlbums(response.offset + 50)
          : EMPTY
      ),
      map((response) =>
        response.items
          .filter((item: any) => item != null)
          .map((item: any): SpotifyContent => {
          return {
            id: item.album.id,
            type: ContentType.Album,
            name: item.album.name,
            description: undefined,
            image: item.album.images.at(0),
            tracks: item.album.tracks.items.map((track: any): Track => {
              return {
                song: track.name,
                album: item.album.name,
                artist: track.artists.map((x: any) => x.name).join(', '),
                songUri: track.uri,
                image: item.album.images.at(0),
              };
            }),
          };
        })
      ),
      reduce((acc: SpotifyContent[], albums) => acc.concat(albums), [])
    );
  }

  private loadCurrentUserPlaylists(): Observable<SpotifyContent[]> {
    return this.spotifyService.getCurrentUserPlaylists().pipe(
      expand((response) =>
        response.next
          ? this.spotifyService.getCurrentUserPlaylists(response.offset + 50)
          : EMPTY
      ),
      map((response) =>
        response.items
          .filter((playlist: SpotifyPlaylist) => playlist != null)
          .map((playlist: SpotifyPlaylist): SpotifyContent => {
          return {
            id: playlist.id,
            type: ContentType.Playlist,
            name: playlist.name,
            description: playlist.description,
            image: playlist.images.at(0),
            tracks: [],
          };
        })
      ),
      reduce((acc: SpotifyContent[], artists) => acc.concat(artists), [])
    );
  }

  private loadFollowedArtists(): Observable<SpotifyContent[]> {
    return this.spotifyService.getFollowedArtists().pipe(
      expand((response) =>
        response.artists.next
          ? this.spotifyService.getFollowedArtists(
              response.artists.cursors.after
            )
          : EMPTY
      ),
      map((response) =>
        response.artists.items
          .filter((item: any) => item != null) 
          .map((artist: any): SpotifyContent => {
          return {
            id: artist.id,
            type: ContentType.Artist,
            name: artist.name,
            description: undefined,
            image: artist.images.at(0),
            tracks: [],
          };
        })
      ),
      reduce((acc: SpotifyContent[], artists) => acc.concat(artists), [])
    );
  }
}
