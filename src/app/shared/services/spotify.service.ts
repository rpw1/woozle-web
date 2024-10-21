import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com';
  private readonly httpClient = inject(HttpClient);

  getCurrentUserPlaylists() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/'me/playlists`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getPlaylistTracks(playlistId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/playlists/${playlistId}/tracks`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getTrack(trackId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/tracks/${trackId}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getAvailableDevices(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/me/player/devices`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  playPlayer(deviceId: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/me/player/play`, {
      device_id: deviceId
    }).pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  pausePlayer(deviceId: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/me/player/pause`, {
      device_id: deviceId
    }).pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }
}
