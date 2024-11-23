import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentActions } from '../../../content/state/actions/content.actions';
import { GameActions } from '../../../game/state/actions/game.actions';
import { Game } from '../../../game/state/models/game.model';
import { SpotifyDevice } from '../../../shared/models/spotify-device';
import { SpotifyPlaybackService } from '../../services/spotify-playback.service';
import { AvailableDevicesService } from '../../state/available-devices.service';
import { DeviceComponent } from '../device/device.component';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    DeviceComponent
  ],
  templateUrl: './device-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceListComponent implements OnInit {
  private readonly gameStore = inject(Store<Game>);
  private readonly router = inject(Router);
  private readonly availableDevicesService = inject(AvailableDevicesService);
  private readonly spotifyPlaybackService = inject(SpotifyPlaybackService);
  devices$ = this.availableDevicesService.availableDevices$;

  async ngOnInit(): Promise<void> {
    console.log('in on init')
    this.gameStore.dispatch(ContentActions.loadContent());
    const accessToken = localStorage.getItem('access_token') ?? '';
    await this.spotifyPlaybackService.initPlaybackSDK(accessToken, 0.5);
    console.log('player is init')
  }

  setDevice(device: SpotifyDevice) {
    this.gameStore.dispatch(GameActions.loadDevice({ device: device }));
    void this.router.navigate(['/contents/select']);
  }
}
