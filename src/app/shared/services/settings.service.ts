import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Settings } from '../models/settings';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly httpClient = inject(HttpClient);
  
  private readonly settingsPath = environment.production ? '/assets/settings.json' : '/assets/settings.local.json';
  settings!: Signal<Settings>;

  async loadSettings(): Promise<void> {
    const loadedSettings = await firstValueFrom(this.httpClient.get<Settings>(this.settingsPath));
    this.settings = computed(() => loadedSettings);
  }
}

export function initApp(settingsService: SettingsService) {
  return async () => await settingsService.loadSettings();
}
