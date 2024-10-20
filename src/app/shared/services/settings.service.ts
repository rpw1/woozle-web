import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly httpClient = inject(HttpClient);
  
  // todo add some logic to get a different path deployment vs local
  private readonly settingsPath = '/assets/settings.local.json';
  settings!: Signal<Settings>;

  async loadSettings(): Promise<void> {
    const loadedSettings = await firstValueFrom(this.httpClient.get<Settings>(this.settingsPath));
    this.settings = computed(() => loadedSettings);
  }
}

export function initApp(settingsService: SettingsService) {
  return async () => await settingsService.loadSettings();
}
