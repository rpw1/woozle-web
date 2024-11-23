import { inject, Injectable } from '@angular/core';
import { exhaustMap, ReplaySubject, Subject } from 'rxjs';
import { SpotifyService } from '../../shared/services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableDevicesService {
  private readonly spotifyService = inject(SpotifyService);
  private hasBuiltInPlayerLoaded = false;

  private readonly spotifyPlaybackDevice = new ReplaySubject<void>(1);
  readonly availableDevices$ = this.spotifyPlaybackDevice.pipe(
    exhaustMap(() => this.spotifyService.getAvailableDevices())
  )

  async loadAvailableDevice(): Promise<void> {
    if (this.hasBuiltInPlayerLoaded) {
      this.spotifyPlaybackDevice.next();
      return
    }
    
    const accessToken = localStorage.getItem('access_token') ?? '';
    await this.initPlaybackSDK(accessToken, 0.5);
  }


  private async initPlaybackSDK(token: string, volume: number) {
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
    const player = new Player({
      name: 'Woozle Built-In Spotify Web Player',
      getOAuthToken: (cb: any) => {
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
      this.hasBuiltInPlayerLoaded = true;
      this.spotifyPlaybackDevice.next();
    });

    player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Device ID has gone offline', device_id);
      this.hasBuiltInPlayerLoaded = false;
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
