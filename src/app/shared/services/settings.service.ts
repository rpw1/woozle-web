import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly defaultSettings: Settings = {
    spotifyClientId: '',
    redirectUri: ''
  };
  private readonly httpClient = inject(HttpClient);
  
  // todo add some logic to get a different path deployment vs local
  private readonly settingsPath = '/assets/settings.local.json';
  readonly settings: Signal<Settings> = toSignal(this.httpClient.get<Settings>(this.settingsPath), {initialValue: this.defaultSettings});
}
