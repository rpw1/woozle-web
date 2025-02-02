import { inject, Injectable } from '@angular/core';
import { exhaustMap, ReplaySubject } from 'rxjs';
import { SpotifyService } from '../../shared/services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableDevicesService {
  private player: any | undefined;
  private readonly spotifyService = inject(SpotifyService);

  private readonly spotifyPlaybackDevice = new ReplaySubject<void>(1);
  readonly availableDevices$ = this.spotifyPlaybackDevice.pipe(
    exhaustMap(() => this.spotifyService.getAvailableDevices())
  )

  async loadAvailableDevices(): Promise<void> {
    if (!this.player) {
      const accessToken = localStorage.getItem('access_token') ?? '';
      await this.initPlaybackSDK(accessToken, 0.5);
    }

    this.spotifyPlaybackDevice.next();
  }

  // This is needed for the music to play on iOS devices
  // Not removing this file because I can't test on mobile until I push my changes
  setPlayerActiveElement() {
    if (this.player) {
      this.player.activateElement();
    }
  }

  private async initPlaybackSDK(token: string, volume: number) {
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
    const player = new Player({
      name: `Woozle Built-In Spotify Web Player - ${(window as any).navigator.userAgentData?.platform ?? 'UNKNOWN'}`,
      getOAuthToken: (cb: any) => {
        cb(token);
      },
      volume
    });
    this.player = player;

    player.addListener('initialization_error', ({ message }: { message: string }) => {
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }: { message: string }) => {
      console.error(message);
    });

    player.addListener('account_error', ({ message }: { message: string }) => {
      alert(`You account has to have Spotify Premium for playing music ${message}`);
    });

    player.addListener('playback_error', ({ message }: { message: string }) => {
      console.error(message);
    });

    player.addListener('ready', async ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Ready with Device ID', device_id);
      await new Promise(resolve => setTimeout(resolve, 500));
      // Ensuring the device is registered in spotify before calling their API again.
      this.spotifyPlaybackDevice.next();
    });

    player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Device ID has gone offline', device_id);
    });

    await player.connect();
  }

  private waitForSpotifyWebPlaybackSDKToLoad(): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (<any>window).onSpotifyWebPlaybackSDKReady = () => {};

    return new Promise((resolve) => {
      if ((<any>window).Spotify) {
        resolve((<any>window).Spotify);
      } else {
        (<any>window).onSpotifyWebPlaybackSDKReady = () => {
          resolve((<any>window).Spotify);
        };
      }
    });
  }
}
