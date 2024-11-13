import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, EMPTY, expand, from, map, mergeMap, Observable, reduce, tap } from 'rxjs';
import { Content } from '../../game/state/models/content';
import { ContentType } from '../../game/state/models/content-type';
import { Track } from '../../game/state/models/track';
import { SpotifyDevice } from '../models/spotify-device';
import { SpotifyPlaylist } from '../models/spotify-playlist';
import { SpotifyPlaylistItemsResponse } from '../models/spotify-playlist-items-response';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly httpClient = inject(HttpClient);

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

  loadContent(): Observable<Content[]> {
    return combineLatest([this.loadSavedAlbums(), this.loadFollowedArtists(), this.loadCurrentUserPlaylists()])
      .pipe(
        map(([albums, artists, playlists]) => playlists.concat(artists).concat(albums))
      )
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
    return this.getPlaylistTracks(playlistId)
      .pipe(
        expand(response => response.next ? this.getPlaylistTracks(playlistId, response.offset + 100) : EMPTY),
        map(response => response.items.map(item => {
          return {
            song: item.track.name,
            album: item.track.album.name,
            artist: item.track.artists.map((x: any) => x.name).join(", "),
            songUri: item.track.uri,
            image: item.track.album.images.at(0)
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

  loadArtistTracks(artistId: string) {
    return this.getArtistAlbums(artistId)
      .pipe(
        mergeMap(response => from(response.items as any[])),
        mergeMap(album => this.getAlbumTracks(album.id)
          .pipe(
            expand(response => response.next ? this.getAlbumTracks(album.id, response.offset + 100) : EMPTY),
            map(response => response.items.map((item: any) => {
              return {
                song: item.name,
                album: album.name,
                artist: item.artists.map((x: any) => x.name).join(", "),
                songUri: item.uri,
                image: album.images.at(0)
              } as Track;
            }))
          )
        ),
        reduce((acc: Track[], tracks) => acc.concat(tracks), []),
      )
  }

  private getArtistAlbums(artistId: string, offset: number = 0): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/artists/${artistId}/albums`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      },
      params: {
        offset: offset,
        include_groups: 'album'
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  private getAlbumTracks(albumId: string, offset: number = 0): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/albums/${albumId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      },
      params: {
        offset: offset,
        limit: 50
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  private getPlaylistTracks(playlistId: string, offset: number = 0): Observable<SpotifyPlaylistItemsResponse> {
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

  private loadSavedAlbums(): Observable<Content[]> {
    return this.getSavedAlbums()
      .pipe(
        expand(response => response.next ? this.getSavedAlbums(response.offset + 50) : EMPTY),
        map(response => response.items.map((item: any) => {
          return {
            id: item.album.id,
            type: ContentType.Album,
            name: item.album.name,
            image: item.album.images.at(0),
            tracks: item.album.tracks.items.map((track: any) => {
              return {
                song: track.name,
                album: item.album.name,
                artist: track.artists.map((x: any) => x.name).join(", "),
                songUri: track.uri,
                image: item.album.images.at(0),
              } as Track;
            })
          } as Content;
        })),
        reduce((acc: Content[], albums) => acc.concat(albums), []),
      )
  }

  private getSavedAlbums(offset: number = 0): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/me/albums`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      },
      params: {
        limit: 50,
        offset: offset
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  private loadCurrentUserPlaylists(): Observable<Content[]> {
    return this.getCurrentUserPlaylists()
      .pipe(
        expand(response => response.next ? this.getCurrentUserPlaylists(response.offset + 50) : EMPTY),
        map(response => response.items.map((playlist: SpotifyPlaylist) => {
          return {
            id: playlist.id,
            type: ContentType.Playlist,
            name: playlist.name,
            description: playlist.description,
            image: playlist.images.at(0),
            tracks: []
          }
        })),
        reduce((acc: Content[], artists) => acc.concat(artists), []),
      )
  }

  private getCurrentUserPlaylists(offset: number = 0): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/me/playlists`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      },
      params: {
        limit: 50,
        offset: offset
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  private loadFollowedArtists(): Observable<Content[]> {
    return this.getFollowedArtists()
      .pipe(
        expand(response => response.artists.next ? this.getFollowedArtists(response.artists.cursors.after) : EMPTY),
        map(response => response.artists.items.map((artist: any) => {
          return {
            id: artist.id,
            type: ContentType.Artist,
            name: artist.name,
            image: artist.images.at(0),
            tracks: []
          }
        })),
        reduce((acc: Content[], artists) => acc.concat(artists), []),
      )
  }

  private getFollowedArtists(artistId: string = ''): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/me/following`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`
      },
      params: {
        type: 'artist',
        limit: 50,
        after: artistId
      }
    }).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
