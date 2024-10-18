import { computed, Injectable, Signal } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Signal<Settings> | undefined;
  constructor() {
    fetch('./src/environments/settings.local.json').then(async (response) => {
      const body = await response.json()
      this.settings = computed(() => body)
    })
  }
}
