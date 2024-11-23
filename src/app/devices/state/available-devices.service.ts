import { inject, Injectable } from '@angular/core';
import { exhaustMap, Subject } from 'rxjs';
import { SpotifyService } from '../../shared/services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableDevicesService {
  private readonly spotifyService = inject(SpotifyService);

  private readonly spotifyPlaybackDevice = new Subject<void>();
  readonly availableDevices$ = this.spotifyPlaybackDevice.pipe(
    exhaustMap(playbackDevice => this.spotifyService.getAvailableDevices())
  )

  loadAvailableDevices(): void {
    this.spotifyPlaybackDevice.next()
  }
}
