import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, firstValueFrom } from 'rxjs';
import { SettingsService } from '../../shared/services/settings.service';
import { SpotifyTokenResponse } from '../models/spotify-token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly spotifyBaseUrl = 'https://accounts.spotify.com';
  private readonly httpClient = inject(HttpClient);
  private readonly $settings = inject(SettingsService).settings;
  private get clientId() { return this.$settings().spotifyClientId; };
  private get redirectUri() { return this.$settings().baseUrl + '/auth/callback'; };

  async authorize(): Promise<boolean> {
    const scopes = [
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state',
      'playlist-read-private',
      'user-follow-read',
      'user-library-read',
      'streaming',
      'user-read-email',
      'user-read-private'
    ]
    const scope = scopes.join(' ');
    const authUrl = new URL(this.spotifyBaseUrl + '/authorize');

    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier)
    const codeChallenge = this.base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);
    const params =  {
      response_type: 'code',
      client_id: this.clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
    return true;
  }

  async getAuthToken(code: string): Promise<boolean> {
    const codeVerifier = localStorage.getItem('code_verifier') ?? '';
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('code_verifier', codeVerifier);

    const request$ = this.httpClient.post<SpotifyTokenResponse>(this.spotifyBaseUrl + '/api/token',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
    const response = await firstValueFrom(request$, { defaultValue: undefined });

    if (!response) {
      console.error('You failed');
      return false;
    }

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token)
    return true;
  }

  async getRefreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token') ?? '';
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    const request$ = this.httpClient.post<SpotifyTokenResponse>(this.spotifyBaseUrl + '/api/token',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
    const response = await firstValueFrom(request$, { defaultValue: undefined });

    if (!response) {
      console.error('You failed');
      return false;
    }

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token)
    return true;
  }

  private base64encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
}
