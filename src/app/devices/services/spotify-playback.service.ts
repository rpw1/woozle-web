import { inject, Injectable } from '@angular/core';
import { AvailableDevicesService } from '../state/available-devices.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackService {
  private readonly availableDevicesService = inject(AvailableDevicesService);

  async initPlaybackSDK(token: string, volume: number) {
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
    const player = new Player({
      name: 'Woozle Built-In Spotify Web Player',
      getOAuthToken: (cb :any) => {
        cb(token);
      },
      volume
    });

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

    player.addListener('ready', ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Ready with Device ID', device_id);
      this.availableDevicesService.loadAvailableDevices();
    });

    player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Device ID has gone offline', device_id);
    });

    await player.connect();
    console.log('player is ready')
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
