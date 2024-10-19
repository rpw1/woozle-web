import { inject, Injectable } from '@angular/core';
import { SettingsService } from '../../shared/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'https://accounts.spotify.com';
  private readonly httpClient = inject(HttpClient);
  private readonly $settings = inject(SettingsService).settings;

  async authorize(): Promise<void> {
    const clientId = this.$settings().spotifyClientId;
    const redirectUri = this.$settings().redirectUri;

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL(this.baseUrl + '/authorize');

    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier)
    const codeChallenge = this.base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code)

    // stored in the previous step
    //let codeVerifier = localStorage.getItem('code_verifier');

    const response = await firstValueFrom(this.httpClient.post<any>(this.baseUrl + '/api/token', {
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }));

    localStorage.setItem('access_token', response.access_token);
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
