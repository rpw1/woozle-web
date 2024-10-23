import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly httpClient = inject(HttpClient);

  getCurrentUserPlaylists() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/me/playlists`, {
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

  getPlaylistTracks(playlistId: string, offset: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/playlists/${playlistId}/tracks`, {
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

  getTrack(trackId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/tracks/${trackId}`, {
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

  getAvailableDevices(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/me/player/devices`, {
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

  playPlayer(deviceId: string, trackUri: string): Observable<any> {
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
        },
        params: {
          'device_id': deviceId
        }
      }
    ).pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  pausePlayer(deviceId: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/me/player/pause`, 
        null,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
          },
          params: {
            'device_id': deviceId
          }
        }
      ).pipe(
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        );
  }
}
