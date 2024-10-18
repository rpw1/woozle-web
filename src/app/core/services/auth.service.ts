import { inject, Injectable } from '@angular/core';
import { SettingsService } from '../../shared/services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly $settings = inject(SettingsService).settings;

  async authorize(): Promise<void> {
    const clientId = this.$settings?.().spotifyClientId ?? '';
    const redirectUri = 'http://localhost:4200';

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier)
    const codeChallenge = this.base64encode(hashed);

    // generated in the previous step
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
