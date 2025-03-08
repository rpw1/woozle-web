import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { SpotifyPlaylistItemsResponse } from '../models/spotify-playlist-items-response';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  public static readonly SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
  private readonly httpClient = inject(HttpClient);

  getAlbumTracks(albumId: string, offset: number = 0): Observable<any> {
    return this.httpClient
      .get<any>(`${SpotifyService.SPOTIFY_BASE_URL}/albums/${albumId}/tracks`, {
        params: {
          offset: offset,
          limit: 50,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getArtistAlbums(artistId: string, offset: number = 0): Observable<any> {
    return this.httpClient
      .get<any>(
        `${SpotifyService.SPOTIFY_BASE_URL}/artists/${artistId}/albums`,
        {
          params: {
            offset: offset,
            include_groups: 'album',
          },
        }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getPlaylistTracks(
    playlistId: string,
    offset: number = 0
  ): Observable<SpotifyPlaylistItemsResponse> {
    return this.httpClient
      .get<SpotifyPlaylistItemsResponse>(
        `${SpotifyService.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
        {
          params: {
            offset: offset,
          },
        }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getSavedAlbums(offset: number = 0): Observable<any> {
    return this.httpClient
      .get<any>(`${SpotifyService.SPOTIFY_BASE_URL}/me/albums`, {
        params: {
          limit: 50,
          offset: offset,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getCurrentUserPlaylists(offset: number = 0): Observable<any> {
    return this.httpClient
      .get<any>(`${SpotifyService.SPOTIFY_BASE_URL}/me/playlists`, {
        params: {
          limit: 50,
          offset: offset,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getFollowedArtists(artistId: string = ''): Observable<any> {
    return this.httpClient
      .get<any>(`${SpotifyService.SPOTIFY_BASE_URL}/me/following`, {
        params: {
          type: 'artist',
          limit: 50,
          after: artistId,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  playPlayer(trackUri: string): Observable<any> {
    return this.httpClient
      .put(`${SpotifyService.SPOTIFY_BASE_URL}/me/player/play`, {
        position_ms: 0,
        uris: [trackUri],
        offset: {
          position: 0,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  pausePlayer(): Observable<any> {
    return this.httpClient
      .put(`${SpotifyService.SPOTIFY_BASE_URL}/me/player/pause`, null)
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  transferPlayback(deviceId: string): Observable<void> {
    return this.httpClient
      .put<void>(`${SpotifyService.SPOTIFY_BASE_URL}/me/player`, {
        device_ids: [deviceId],
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }
}
