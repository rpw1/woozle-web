import { inject, Injectable } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
import { firstValueFrom, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private player: any | undefined;
  private spotifyService = inject(SpotifyService);
  
  private playerActiveSubject = new ReplaySubject<boolean>(1);
  playerActive$ = this.playerActiveSubject.asObservable();

  async loadAvailableDevices(): Promise<void> {
    console.log(this.player)
    if (!this.player) {
      const accessToken = localStorage.getItem('access_token') ?? '';
      await this.initPlaybackSDK(accessToken, 0.5);
      return;
    }

    this.playerActiveSubject.next(true);
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
      name: 'Woozle Built-In Spotify Web Player',
      getOAuthToken: (cb: any) => {
        cb(token);
      },
      volume
    });
    this.player = player;

    player.addListener('initialization_error', ({ message }: { message: string }) => {
      console.error(message);
      this.playerActiveSubject.next(false)
    });

    player.addListener('authentication_error', ({ message }: { message: string }) => {
      console.error(message);
      this.playerActiveSubject.next(false)
    });

    player.addListener('account_error', ({ message }: { message: string }) => {
      alert(`You account has to have Spotify Premium for playing music ${message}`);
      this.playerActiveSubject.next(false)
    });

    player.addListener('playback_error', ({ message }: { message: string }) => {
      console.error(message);
      this.playerActiveSubject.next(false)
    });

    player.addListener('ready', async ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Ready with Device ID', device_id);
      await firstValueFrom(this.spotifyService.transferPlayback(device_id));
      this.playerActiveSubject.next(true)
    });

    player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('[Angular Spotify] Device ID has gone offline', device_id);
      this.playerActiveSubject.next(false)
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
