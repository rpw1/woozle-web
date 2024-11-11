import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, expand, map, mergeAll, Observable, of, reduce, tap } from 'rxjs';
import { Track } from '../../game/state/models/track';
import { SpotifyPlaylist } from '../models/spotify-playlist';
import { SpotifyPlaylistItemsResponse } from '../models/spotify-playlist-items-response';
import { SpotifyDevice } from '../models/spotify-device';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly httpClient = inject(HttpClient);

  getCurrentUserPlaylists() : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/me/playlists`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      }
    }).pipe(
      map(x => x.items as SpotifyPlaylist[]),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  getAvailableDevices(): Observable<{devices: SpotifyDevice[]}> {
    return this.httpClient.get<{devices: SpotifyDevice[]}>(`${this.baseUrl}/me/player/devices`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  playPlayer(trackUri: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/me/player/play`, {
        position_ms: 0,
        uris: [trackUri],
        offset: {
          'position': 0
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
        }
      }
    ).pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  pausePlayer(): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/me/player/pause`,
      null,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
        },
      }
    ).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  loadPlaylistTracks(playlistId: string): Observable<Track[]> {
    return this.getPlaylistTracks(playlistId, 0)
      .pipe(
        expand(response => response.next ? this.getPlaylistTracks(playlistId, response.offset + 100) : EMPTY),
        map(response => response.items.map(item => {
          return {
            song: item.track.name,
            album: item.track.album.name,
            artist: item.track.artists.map((x: any) => x.name).join(", "),
            songUri: item.track.uri,
            imageUri: item.track.album.images.at(0)?.url
          } as Track;
        })),
        reduce((acc: Track[], tracks) => acc.concat(tracks), []),
      )
  }

  transferPlayback(deviceId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/me/player`, {
        device_ids: [
          deviceId
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
        },
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  private getPlaylistTracks(playlistId: string, offset: number): Observable<SpotifyPlaylistItemsResponse> {
    return this.httpClient.get<SpotifyPlaylistItemsResponse>(`${this.baseUrl}/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      },
      params: {
        offset: offset
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
